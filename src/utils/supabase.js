import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// You'll need to create a Supabase project at https://supabase.com
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database schema for DataMaster
// Run these SQL queries in your Supabase SQL editor to set up the database

export const databaseSchema = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) DEFAULT 0,
  image TEXT,
  category TEXT,
  source TEXT DEFAULT 'datamaster',
  shop_link TEXT,
  duration TEXT,
  level TEXT,
  instructor TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'announcement',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  instructor TEXT,
  certificate_id TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  purchase_date DATE
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public read access for courses and announcements
CREATE POLICY "Public courses read access" ON courses FOR SELECT USING (true);
CREATE POLICY "Public announcements read access" ON announcements FOR SELECT USING (true);

-- Authenticated users can manage their own data
CREATE POLICY "Users manage own data" ON users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users manage own favorites" ON favorites FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own certificates" ON certificates FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own comments" ON comments FOR ALL USING (auth.uid() = user_id);

-- Admin can manage all data
CREATE POLICY "Admins manage all courses" ON courses FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins manage all announcements" ON announcements FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
`;

// Helper functions for Supabase operations
export const supabaseHelpers = {
  // Auth helpers
  async signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    return { data, error };
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Courses helpers
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async addCourse(course) {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select();
    return { data, error };
  },

  async updateCourse(id, course) {
    const { data, error } = await supabase
      .from('courses')
      .update(course)
      .eq('id', id)
      .select();
    return { data, error };
  },

  async deleteCourse(id) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Announcements helpers
  async getAnnouncements() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async addAnnouncement(announcement) {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcement])
      .select();
    return { data, error };
  },

  async deleteAnnouncement(id) {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Favorites helpers
  async getFavorites(userId) {
    const { data, error } = await supabase
      .from('favorites')
      .select('courses(*)')
      .eq('user_id', userId);
    return { data: data?.map(d => d.courses), error };
  },

  async addFavorite(userId, courseId) {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, course_id: courseId }])
      .select();
    return { data, error };
  },

  async removeFavorite(userId, courseId) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId);
    return { error };
  },

  // Certificates helpers
  async getCertificates(userId) {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .order('issued_at', { ascending: false });
    return { data, error };
  },

  async addCertificate(certificate) {
    const { data, error } = await supabase
      .from('certificates')
      .insert([certificate])
      .select();
    return { data, error };
  },

  // Comments helpers
  async getComments(courseId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, users(name)')
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async addComment(comment) {
    const { data, error } = await supabase
      .from('comments')
      .insert([comment])
      .select();
    return { data, error };
  }
};

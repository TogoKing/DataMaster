import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with Supabase or an email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'datamaster557@gmail.com',
      href: 'mailto:datamaster557@gmail.com'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+228 93 83 60 08 / 93 86 42 69',
      href: 'tel:+22893836008'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Rejoindre notre groupe',
      href: 'https://chat.whatsapp.com/F2NCzMfbwgRBgfq32EPfOp'
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=100095420502191',
      color: 'hover:text-blue-600'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/datamaster_1?igsh=OWZpYjlqY2I0ampo',
      color: 'hover:text-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nous Contacter
          </h1>
          <p className="text-xl text-gray-200">
            Une question ? N'hésitez pas à nous contacter
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Informations de Contact
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.label}</h3>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-medium text-gray-900 mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 ${social.color} transition-colors`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Envoyez un Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="input-field"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="input-field"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="input-field"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Envoyer le Message</span>
                </button>

                {submitted && (
                  <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg">
                    Message envoyé avec succès ! Nous vous répondrons sous peu.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

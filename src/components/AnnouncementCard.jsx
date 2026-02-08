import { Calendar, Tag } from 'lucide-react';

const AnnouncementCard = ({ announcement }) => {
  const getTypeColor = (type) => {
    const colors = {
      announcement: 'bg-blue-100 text-blue-800',
      promotion: 'bg-green-100 text-green-800',
      event: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || colors.announcement;
  };

  const getPriorityStyle = (priority) => {
    const styles = {
      high: 'border-l-4 border-red-500',
      medium: 'border-l-4 border-yellow-500',
      low: 'border-l-4 border-green-500'
    };
    return styles[priority] || styles.medium;
  };

  const getTypeLabel = (type) => {
    const labels = {
      announcement: 'Annonce',
      promotion: 'Promotion',
      event: 'Événement'
    };
    return labels[type] || 'Annonce';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${getPriorityStyle(announcement.priority)}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`${getTypeColor(announcement.type)} px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}>
          <Tag className="w-3 h-3" />
          <span>{getTypeLabel(announcement.type)}</span>
        </span>
        <span className="text-gray-500 text-sm flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {announcement.date}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {announcement.title}
      </h3>
      
      <p className="text-gray-600">
        {announcement.content}
      </p>
    </div>
  );
};

export default AnnouncementCard;

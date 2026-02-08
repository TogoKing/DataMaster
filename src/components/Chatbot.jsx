import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Bonjour ! Je suis Florida, votre assistant DataMaster. Comment puis-je vous aider aujourd\'hui ?',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // FAQ responses for Florida
  const faqResponses = {
    'cours': 'Nous proposons des formations en Data Science, Machine Learning, Design UI/UX, Montage Vidéo, Musique et Création de Contenu. Consultez notre page Formations pour voir tous les détails !',
    'formation': 'Nous proposons des formations en Data Science, Machine Learning, Design UI/UX, Montage Vidéo, Musique et Création de Contenu. Consultez notre page Formations pour voir tous les détails !',
    'prix': 'Les prix varient selon la formation. Certaines sont gratuites (Harvard, Analytics Vidhya) et d\'autres sont payantes. Cliquez sur "Suivre" pour voir le prix exact sur notre boutique.',
    'certificat': 'Après avoir acheté une formation sur notre boutique, vous pourrez télécharger votre certificat depuis la page Certificats sur notre site. Vous pourrez également le recevoir par email !',
    'inscription': 'Pour vous inscrire, cliquez sur "Inscription" en haut à droite. Vous pourrez créer un compte avec votre email et mot de passe.',
    'connexion': 'Pour vous connecter, utilisez le bouton "Connexion" en haut à droite. Entrez votre email et mot de passe.',
    'contact': 'Vous pouvez nous contacter par email à datamaster557@gmail.com, par téléphone au +228 93 83 60 08 / 93 86 42 69, ou rejoindre notre groupe WhatsApp !',
    'whatsapp': 'Rejoignez notre groupe WhatsApp : https://chat.whatsapp.com/F2NCzMfbwgRBgfq32EPfOp',
    'boutique': 'Notre boutique se trouve ici : https://hxlybyvr.mychariow.shop - C\'est là que vous pouvez acheter nos formations !',
    'paiement': 'Les paiements sont effectués sur notre boutique en ligne. Nous acceptons différents modes de paiement sécurisés.',
    'téléchargement': 'Après votre achat, vous pourrez télécharger vos formations depuis votre espace sur la boutique.',
    'délai': 'Les formations sont accessibles immédiatement après l\'achat. Vous pouvez les suivre à votre rythme !',
    'default': 'Je ne suis pas sûr de comprendre votre question. Pouvez-vous reformuler ? Je peux vous aider sur nos formations, les prix, les certificats, l\'inscription, ou la boutique.'
  };

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('cours') || lowerInput.includes('formation')) {
      return faqResponses['formation'];
    }
    if (lowerInput.includes('prix') || lowerInput.includes('tarif') || lowerInput.includes('combien')) {
      return faqResponses['prix'];
    }
    if (lowerInput.includes('certificat')) {
      return faqResponses['certificat'];
    }
    if (lowerInput.includes('inscr') || lowerInput.includes('s\'inscr')) {
      return faqResponses['inscription'];
    }
    if (lowerInput.includes('connex') || lowerInput.includes('connect')) {
      return faqResponses['connexion'];
    }
    if (lowerInput.includes('contact') || lowerInput.includes('téléphon') || lowerInput.includes('email')) {
      return faqResponses['contact'];
    }
    if (lowerInput.includes('whatsapp')) {
      return faqResponses['whatsapp'];
    }
    if (lowerInput.includes('boutique') || lowerInput.includes('achet') || lowerInput.includes('pay')) {
      return faqResponses['boutique'];
    }
    if (lowerInput.includes('paiement')) {
      return faqResponses['paiement'];
    }
    if (lowerInput.includes('télécharg') || lowerInput.includes('telecharg')) {
      return faqResponses['téléchargement'];
    }
    if (lowerInput.includes('délai') || lowerInput.includes('acces') || lowerInput.includes('accès')) {
      return faqResponses['délai'];
    }
    if (lowerInput.includes('bonjour') || lowerInput.includes('salut') || lowerInput.includes('coucou')) {
      return 'Bonjour ! Je suis Florida, ravie de vous aider ! Posez-moi vos questions sur DataMaster.';
    }
    if (lowerInput.includes('merci')) {
      return 'De rien ! N\'hésitez pas si vous avez d\'autres questions. 😊';
    }
    
    return faqResponses['default'];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: getResponse(userMessage.text),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-primary-700 hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Florida</h3>
                <p className="text-xs text-primary-200">Assistant DataMaster</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'bot' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.type === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-md' 
                      : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-primary-200' : 'text-gray-400'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

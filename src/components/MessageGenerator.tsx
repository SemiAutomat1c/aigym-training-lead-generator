import React, { useState } from 'react';
import { generateMessage } from '../services/aiService';

interface LeadInfo {
  name: string;
  interests?: string;
}

interface Message {
  name: string;
  interests: string;
  message: string;
}

const MessageGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('level0');
  const [template, setTemplate] = useState('company');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseInput = (input: string): LeadInfo[] => {
    // Split by empty lines to separate leads
    const leads = input.split(/\n\s*\n/).filter(lead => lead.trim());
    
    return leads.map(lead => {
      const lines = lead.split('\n').map(line => line.trim());
      const name = lines[0] || '';
      // Preserve the exact format of interests including parentheses
      const interests = lines[1] || '';
      
      return { name, interests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const leads = parseInput(inputText);
      const generatedMessages: Message[] = [];

      for (const lead of leads) {
        if (!lead.name.trim()) continue;

        const message = await generateMessage({
          leadInfo: {
            name: lead.name,
            interests: lead.interests || '',
            company: '',
            industry: '',
            position: '',
            painPoints: '',
            additionalInfo: '',
          },
          messageType: 'instagram',
          tone: tone,
          template: template
        });

        generatedMessages.push({
          name: lead.name,
          interests: lead.interests || '',
          message: message
        });
      }

      setMessages(generatedMessages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter leads (one lead per block, separated by empty lines):
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={10}
            placeholder="Name&#10;trait1 / trait2&#10;&#10;Name&#10;trait1 / trait2"
          />
          <p className="text-sm text-gray-600 mt-1">
            Format: Name on first line, traits on second line separated by " / " (space-slash-space)
          </p>
          <p className="text-sm text-gray-600">
            Example: "Henry&#10;works at (ig/mindmusclesg) / traveling with fam"
          </p>
        </div>

        <div className="mb-4 flex gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Message Tone:
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="level0">Level 0 - Normal</option>
              <option value="level2">Level 2 - BTW Singlish</option>
              <option value="level3">Level 3 - BTW & PS Singlish</option>
              <option value="level4">Level 4 - Full Singlish</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Template:
            </label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="company">Company Account (Jet)</option>
              <option value="max-company">Max - Company Account</option>
              <option value="followup">Normal Follow-up (Bob)</option>
              <option value="bob-followup">BOB - Follow-up</option>
              <option value="matthew-followup">MATTHEW - Follow-up</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? 'Generating...' : 'Generate Messages'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {messages.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Traits</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{msg.name}</td>
                  <td className="px-4 py-2 border">{msg.interests}</td>
                  <td className="px-4 py-2 border whitespace-pre-wrap">{msg.message}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => copyToClipboard(msg.message)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MessageGenerator; 
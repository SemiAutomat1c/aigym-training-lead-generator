import React, { useState, useEffect } from 'react';
import { generateMessage } from '../services/aiService';

interface ExampleMessage {
  name: string;
  template: string;
  tone: string;
  interests: string;
  message: string;
}

const TestExamples: React.FC = () => {
  const [examples, setExamples] = useState<ExampleMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateExamples = async () => {
      const exampleData = [
        {
          name: "John",
          template: "max",
          tone: "level0",
          interests: "works at (ig/mindmusclesg) / traveling with fam"
        },
        {
          name: "Sarah",
          template: "max",
          tone: "level4",
          interests: "wears shades (tt/@gibsaw) / likes jackets"
        },
        {
          name: "Mike",
          template: "bob",
          tone: "level0",
          interests: "works at (https://fitnesshub.com) / beard looks good"
        },
        {
          name: "Lisa",
          template: "bob",
          tone: "level3",
          interests: "studying at NUS / wears nice watches"
        },
        {
          name: "David",
          template: "matthew",
          tone: "level0",
          interests: "works at Google / likes puffer jackets"
        },
        {
          name: "Emma",
          template: "matthew",
          tone: "level4",
          interests: "studying at SMU / wears caps"
        }
      ];

      const generatedExamples: ExampleMessage[] = [];

      for (const example of exampleData) {
        try {
          const message = await generateMessage({
            leadInfo: {
              name: example.name,
              interests: example.interests,
              company: '',
              industry: '',
              position: '',
              painPoints: '',
              additionalInfo: '',
            },
            messageType: 'instagram',
            tone: example.tone,
            template: example.template
          });

          generatedExamples.push({
            ...example,
            message
          });
        } catch (error) {
          console.error(`Error generating example for ${example.name}:`, error);
        }
      }

      setExamples(generatedExamples);
      setIsLoading(false);
    };

    generateExamples();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Template Examples</h2>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow">
              <div className="mb-2">
                <span className="font-bold">Name:</span> {example.name}
              </div>
              <div className="mb-2">
                <span className="font-bold">Template:</span> {example.template.toUpperCase()}
              </div>
              <div className="mb-2">
                <span className="font-bold">Tone:</span> {example.tone}
              </div>
              <div className="mb-2">
                <span className="font-bold">Traits:</span> {example.interests}
              </div>
              <div className="mb-2">
                <span className="font-bold">Message:</span>
                <div className="whitespace-pre-wrap bg-gray-50 p-3 rounded mt-1 border">
                  {example.message}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(example.message)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Copy Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestExamples; 
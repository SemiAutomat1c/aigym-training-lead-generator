import React, { useState, useEffect } from 'react';
import { generateMessage } from '../services/aiService';

interface TestExample {
  name: string;
  traits: string;
  message: string;
  tone: string;
}

const TestExamples: React.FC = () => {
  const [examples, setExamples] = useState<TestExample[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample test cases from real client data
  const testCases = [
    {
      name: "Henry",
      traits: "works at (ig/mindmusclesg) / traveling with fam",
      tone: "level2"
    },
    {
      name: "Alex",
      traits: "content creator (tt/ @gibsaw) / traveling",
      tone: "level3"
    },
    {
      name: "Jason",
      traits: "business (leaderfit-equipement.com) / stylish glasses",
      tone: "level4"
    },
    {
      name: "Mike",
      traits: "work (ig/physiobusinessmentorsg/) / business owner",
      tone: "level2"
    },
    {
      name: "David",
      traits: "fitness / has gf",
      tone: "level3"
    },
    {
      name: "Sam",
      traits: "stylish jacket / nice watch",
      tone: "level4"
    },
    {
      name: "Ryan",
      traits: "business owner (@hydroflux_singapore) / travel w gf",
      tone: "level2"
    },
    {
      name: "Thomas",
      traits: "co founder (ig/@ascendvisuals_) / adventure",
      tone: "level3"
    }
  ];

  useEffect(() => {
    const generateExamples = async () => {
      const results: TestExample[] = [];
      
      for (const test of testCases) {
        try {
          const message = await generateMessage({
            leadInfo: {
              name: test.name,
              interests: test.traits
            },
            messageType: 'instagram',
            tone: test.tone,
            template: 'company'
          });
          
          results.push({
            name: test.name,
            traits: test.traits,
            message,
            tone: test.tone
          });
        } catch (error) {
          console.error(`Error generating message for ${test.name}:`, error);
        }
      }
      
      setExamples(results);
      setIsLoading(false);
    };
    
    generateExamples();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Examples with Real Client Data</h1>
      
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-lg">Loading examples...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {examples.map((example, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4">
              <div className="mb-2">
                <span className="font-semibold">Name:</span> {example.name}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Traits:</span> {example.traits}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Tone Level:</span> {example.tone}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Generated Message:</h3>
                <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                  {example.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestExamples; 
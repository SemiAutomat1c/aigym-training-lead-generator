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
    // Original examples
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
    
    // New clothing/appearance examples
    {
      name: "James",
      traits: "fitness / stylish polo",
      tone: "level2"
    },
    {
      name: "Michael",
      traits: "athlete / nice tshirt",
      tone: "level3"
    },
    {
      name: "William",
      traits: "bodybuilding / stylish jacket",
      tone: "level4"
    },
    {
      name: "Daniel",
      traits: "running / cool sunglasses",
      tone: "level2"
    },
    {
      name: "Matthew",
      traits: "swimming / nice watch",
      tone: "level3"
    },
    {
      name: "Christopher",
      traits: "fitness / cool beard",
      tone: "level4"
    },
    {
      name: "Andrew",
      traits: "powerlifting / unique hairstyle",
      tone: "level2"
    },
    {
      name: "Joshua",
      traits: "cycling / nice sweater",
      tone: "level3"
    },
    {
      name: "David",
      traits: "boxing / puffer jacket",
      tone: "level4"
    },
    {
      name: "Ryan",
      traits: "muay thai / cool cap",
      tone: "level2"
    },
    {
      name: "Tyler",
      traits: "rock climbing / nice beanie",
      tone: "level3"
    },
    {
      name: "Brandon",
      traits: "magician / cool eyeglasses",
      tone: "level4"
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
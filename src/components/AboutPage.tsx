import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">About This Application</h2>
        <p className="mb-4">
          The AI Gym Training Lead Generator is designed to help fitness professionals and gym owners
          create personalized Instagram DM messages for potential clients. By analyzing a lead's traits
          and interests from their profile, the application generates highly customized messages that
          increase engagement and conversion rates.
        </p>
        <p className="mb-4">
          This tool supports multiple templates for different outreach scenarios and offers various
          tone levels, including Singlish variations for better connection with the Singaporean audience.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-semibold">Multiple Templates:</span> Choose from MAX (company account), BOB (follow-up), and MATTHEW (follow-up) templates</li>
          <li><span className="font-semibold">Personalized Messaging:</span> Messages are tailored based on the lead's traits and interests</li>
          <li><span className="font-semibold">Tone Variations:</span> Four different tone levels from standard English to full Singlish</li>
          <li><span className="font-semibold">Trait Recognition:</span> Automatically recognizes and formats special traits like Instagram handles, TikTok handles, and websites</li>
          <li><span className="font-semibold">PS Line Formatting:</span> Automatically adds appropriate emojis and formatting to PS lines</li>
          <li><span className="font-semibold">Batch Processing:</span> Process multiple leads at once</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Template Information</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Template Selection Logic</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">MAX - Company Account:</span> Use for initial company outreach</li>
            <li><span className="font-semibold">BOB FOLLOW UP:</span> Use for follow-up sequences when Bob is the sender</li>
            <li><span className="font-semibold">MATTHEW FOLLOW UP:</span> Use for follow-up sequences when Matthew is the sender</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Tone Levels</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Level 0:</span> Standard English with no Singlish elements</li>
            <li><span className="font-semibold">Level 2:</span> Only the BTW phrase contains Singlish elements</li>
            <li><span className="font-semibold">Level 3:</span> Both BTW and PS sections contain Singlish elements</li>
            <li><span className="font-semibold">Level 4:</span> Full Singlish throughout the message (except for the services offered section)</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Input Format</h3>
          <p className="mb-2">
            Enter leads in the following format:
          </p>
          <div className="bg-gray-100 p-3 rounded font-mono">
            Name<br/>
            trait1 / trait2<br/>
            <br/>
            Name<br/>
            trait1 / trait2
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Example: "Henry<br/>works at (ig/mindmusclesg) / traveling with fam"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 
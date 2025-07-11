import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to AI Gym Training Lead Generator</h2>
        <p className="mb-4">
          This application helps you generate personalized Instagram DM messages for gym training leads.
          The messages are tailored based on the lead's traits and interests, making your outreach more effective.
        </p>
        <p className="mb-4">
          Choose from different templates and tone levels to customize your messages for different scenarios.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Templates</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Initial Messages</h3>
          <div className="border-l-4 border-blue-500 pl-4 py-2 mb-4">
            <h4 className="font-bold">MAX - Company Account Template</h4>
            <p className="text-sm text-gray-600">Sender: Max</p>
            <p className="text-sm text-gray-600">Type: Initial outreach from company account</p>
            <p className="mt-2 text-gray-800">
              Hey NAME, Max here btw, I saw that you were following a couple gym accounts, keep it up in the gym btw : )<br/>
              BTW, (INTERESTS AND TRAITS) love it haha 👍<br/>
              I am currently looking for 5 people can join my free training project trial!<br/>
              They get:<br/>
              ✅ a Personalised Diet Plan<br/>
              ✅ a Personalised Training Plan<br/>
              ✅ Telegram Chat Support<br/>
              ✅ Physical Form Correction<br/>
              ✅ To improve Mind Muscle Connection<br/>
              ✅ To make more progress with Less Time and Effort<br/>
              To push them in the right direction this year 💪🏻<br/>
              Do you know anyone who may be interested?<br/>
              PS: How's your gym progress going? : )
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Follow-up Messages</h3>
          <div className="border-l-4 border-green-500 pl-4 py-2 mb-4">
            <h4 className="font-bold">BOB FOLLOW UP</h4>
            <p className="text-sm text-gray-600">Sender: Bob</p>
            <p className="text-sm text-gray-600">Type: Follow-up message (mentions Max)</p>
            <p className="mt-2 text-gray-800">
              Hey (NAME), Bob here, i'm not too sure if my friend Max has reached out to you yet, @max_apolloss<br/>
              but we are hosting a free training project trial, and 5 people can join us for free : )<br/>
              They get:<br/>
              ✅ a Personalised Diet Plan<br/>
              ✅ a Personalised Training Plan<br/>
              ✅ Telegram Chat Support<br/>
              ✅ Physical Form Correction<br/>
              ✅ To improve Mind Muscle Connection<br/>
              ✅ To make more progress with Less Time and Effort<br/>
              To push them in the right direction this year 💪🏻<br/>
              Would you be opposed to taking a slot for yourself?<br/>
              P.S. How's your gym progress going? : )
            </p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h4 className="font-bold">MATTHEW FOLLOW UP</h4>
            <p className="text-sm text-gray-600">Sender: Matthew</p>
            <p className="text-sm text-gray-600">Type: Follow-up message (mentions Max)</p>
            <p className="mt-2 text-gray-800">
              Hey (NAME), Matthew here, i'm not too sure if my friend Max has reached out to you yet, @max_apolloss<br/>
              but we are hosting a free training project trial, and 5 people can join us for free : )<br/>
              They get:<br/>
              ✅ a Personalised Diet Plan<br/>
              ✅ a Personalised Training Plan<br/>
              ✅ Telegram Chat Support<br/>
              ✅ Physical Form Correction<br/>
              ✅ To improve Mind Muscle Connection<br/>
              ✅ To make more progress with Less Time and Effort<br/>
              To push them in the right direction this year 💪🏻<br/>
              Would you be opposed to taking a slot for yourself?<br/>
              P.S. How's your gym progress going? : )
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Tone Levels</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-semibold">Level 0:</span> Normal English</li>
          <li><span className="font-semibold">Level 2:</span> BTW Singlish (only BTW phrase is in Singlish)</li>
          <li><span className="font-semibold">Level 3:</span> BTW & PS Singlish (BTW and PS sections are in Singlish)</li>
          <li><span className="font-semibold">Level 4:</span> Full Singlish (entire message except services offered is in Singlish)</li>
        </ul>
      </div>
    </div>
  );
};

export default Home; 
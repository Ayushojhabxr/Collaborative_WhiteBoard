import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Users, Share2, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Palette size={64} />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Collaborative Whiteboard
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100">
          Dream, design, and innovate together
          </p>
          

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/whiteboard')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Launch Canvas
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          <Feature
            icon={<Users className="w-12 h-12" />}
            title="Real-time Collaboration"
            description="Work together with your team in real-time, seeing changes instantly."
          />
          <Feature
            icon={<Share2 className="w-12 h-12" />}
            title="Easy Sharing"
            description="Share your whiteboard with anyone, anywhere, anytime."
          />
          <Feature
            icon={<Sparkles className="w-12 h-12" />}
            title="Rich Features"
            description="Advanced tools including text manipulation, shapes, and more."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center text-blue-100"
        >
          <p>Created with ❤️ by Ayush Ojha</p>
        </motion.div>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
    >
      <div className="inline-block p-3 bg-white/20 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </motion.div>
  );
}
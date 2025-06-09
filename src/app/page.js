// src/app/home/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { Music, RefreshCw, Play, Heart, Zap, Cloud, Sun, Moon, Star, Sparkles } from 'lucide-react';

export default function MoodQuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // -1 for welcome screen
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedResults, setSavedResults] = useState([]);

  // Load saved results from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodQuizResults');
      if (saved) {
        setSavedResults(JSON.parse(saved));
      }
    }
  }, []);

  // Enhanced questions with mood mappings
  const questions = [
    {
      id: 1,
      question: "How are you feeling right now?",
      emoji: "😊",
      options: [
        { text: "🔥 Energetic and pumped up!", mood: "energetic", points: 3 },
        { text: "😌 Calm and peaceful", mood: "chill", points: 3 },
        { text: "😔 A bit down or melancholic", mood: "sad", points: 3 },
        { text: "💕 Happy and in love", mood: "romantic", points: 3 },
        { text: "💪 Focused and determined", mood: "motivated", points: 3 }
      ]
    },
    {
      id: 2,
      question: "What's your ideal weekend activity?",
      emoji: "🎉",
      options: [
        { text: "💃 Dancing at a party", mood: "energetic", points: 3 },
        { text: "📚 Reading by the fireplace", mood: "chill", points: 3 },
        { text: "🎬 Watching emotional movies", mood: "sad", points: 3 },
        { text: "🍷 Romantic dinner date", mood: "romantic", points: 3 },
        { text: "🏃‍♂️ Working out or hiking", mood: "motivated", points: 3 }
      ]
    },
    {
      id: 3,
      question: "Pick a color that speaks to your soul:",
      emoji: "🎨",
      options: [
        { text: "🧡 Bright Orange - Bold & Vibrant", mood: "energetic", points: 3 },
        { text: "💙 Soft Blue - Peaceful & Serene", mood: "chill", points: 3 },
        { text: "💜 Deep Purple - Mysterious & Deep", mood: "sad", points: 3 },
        { text: "💗 Warm Pink - Loving & Tender", mood: "romantic", points: 3 },
        { text: "❤️ Bold Red - Passionate & Strong", mood: "motivated", points: 3 }
      ]
    },
    {
      id: 4,
      question: "What time of day resonates with you most?",
      emoji: "🕐",
      options: [
        { text: "🌙 Late night party hours", mood: "energetic", points: 3 },
        { text: "🌅 Early morning sunrise", mood: "chill", points: 3 },
        { text: "🌆 Quiet evening hours", mood: "sad", points: 3 },
        { text: "🌇 Golden hour sunset", mood: "romantic", points: 3 },
        { text: "☀️ Mid-day hustle time", mood: "motivated", points: 3 }
      ]
    },
    {
      id: 5,
      question: "Choose your perfect companion beverage:",
      emoji: "☕",
      options: [
        { text: "⚡ Energy drink or strong coffee", mood: "energetic", points: 3 },
        { text: "🍵 Herbal tea or chamomile", mood: "chill", points: 3 },
        { text: "🍫 Hot chocolate with marshmallows", mood: "sad", points: 3 },
        { text: "🍾 Wine or champagne", mood: "romantic", points: 3 },
        { text: "🥤 Protein shake or green juice", mood: "motivated", points: 3 }
      ]
    }
  ];

  // Enhanced mood configurations with multiple songs
  const moods = {
    energetic: {
      name: "🔥 Energetic Vibes",
      description: "You're feeling pumped and ready to conquer the world! Time to turn up the energy!",
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-400 via-red-500 to-pink-500",
      icon: <Zap className="w-8 h-8" />,
      songs: [
        { id: "kJQP7kiw5Fk", title: "Thunder - Imagine Dragons", artist: "Imagine Dragons" },
        { id: "fJ9rUzIMcZQ", title: "Believer - Imagine Dragons", artist: "Imagine Dragons" },
        { id: "7wtfhZwyrcc", title: "Can't Hold Us - Macklemore", artist: "Macklemore" }
      ],
      tips: ["Perfect for workouts", "Great for morning motivation", "Ideal for creative projects"]
    },
    chill: {
      name: "😌 Chill Mode",
      description: "You're in a relaxed, peaceful state of mind. Time to unwind and let the good vibes flow.",
      color: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-400 via-cyan-500 to-teal-500",
      icon: <Cloud className="w-8 h-8" />,
      songs: [
        { id: "5qap5aO4i9A", title: "Lofi Hip Hop Mix", artist: "ChilledCow" },
        { id: "jfKfPfyJRdk", title: "Weightless - Marconi Union", artist: "Marconi Union" },
        { id: "DIBw9dSVKdU", title: "River Flows In You", artist: "Yiruma" }
      ],
      tips: ["Perfect for studying", "Great for meditation", "Ideal for rainy days"]
    },
    sad: {
      name: "🌙 Melancholic Mood",
      description: "Sometimes we all need a good emotional release. It's okay to feel deeply.",
      color: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-600 via-indigo-600 to-blue-700",
      icon: <Moon className="w-8 h-8" />,
      songs: [
        { id: "4NRXx6U8ABQ", title: "Mad World - Gary Jules", artist: "Gary Jules" },
        { id: "hLQl3WQQoQ0", title: "Someone Like You - Adele", artist: "Adele" },
        { id: "YQHsXMglC9A", title: "Hello - Adele", artist: "Adele" }
      ],
      tips: ["Allow yourself to feel", "Journal your thoughts", "Reach out to friends"]
    },
    romantic: {
      name: "💕 Romantic Soul",
      description: "Love is in the air and you're feeling it! Your heart is full of warmth and affection.",
      color: "from-pink-400 to-rose-500",
      bgGradient: "from-pink-400 via-rose-500 to-red-400",
      icon: <Heart className="w-8 h-8" />,
      songs: [
        { id: "450p7goxZqg", title: "All of Me - John Legend", artist: "John Legend" },
        { id: "nfWlot6h_JM", title: "Perfect - Ed Sheeran", artist: "Ed Sheeran" },
        { id: "2Vv-BfVoq4g", title: "Perfect - Ed Sheeran", artist: "Ed Sheeran" }
      ],
      tips: ["Share with someone special", "Write a love letter", "Plan a romantic evening"]
    },
    motivated: {
      name: "💪 Motivation Mode",
      description: "You're focused and ready to achieve your goals! Nothing can stop you now!",
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500 via-emerald-600 to-teal-600",
      icon: <Sun className="w-8 h-8" />,
      songs: [
        { id: "ZXsQAXx_ao0", title: "Eye of the Tiger - Survivor", artist: "Survivor" },
        { id: "btPJPFnesV4", title: "Stronger - Kanye West", artist: "Kanye West" },
        { id: "SlPhMPnQ58k", title: "Lose Yourself - Eminem", artist: "Eminem" }
      ],
      tips: ["Set clear goals", "Make a action plan", "Celebrate small wins"]
    }
  };

  const handleAnswer = (selectedOption) => {
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        calculateMood(newAnswers);
        setLoading(false);
      }, 2000); // Add loading animation
    }
  };

  const calculateMood = async (allAnswers) => {
    const moodCounts = {};
    
    allAnswers.forEach(answer => {
      moodCounts[answer.mood] = (moodCounts[answer.mood] || 0) + answer.points;
    });

    const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b
    );

    const result = {
      mood: dominantMood,
      timestamp: new Date().toISOString(),
      answers: allAnswers.length
    };

    // Save result
    const newResults = [...savedResults, result].slice(-10); // Keep last 10 results
    setSavedResults(newResults);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodQuizResults', JSON.stringify(newResults));
    }

    // Try to save to database
    try {
      await fetch('/api/moods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
    } catch (error) {
      console.log('Database save not available:', error.message);
    }

    setDetectedMood(dominantMood);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(-1);
    setAnswers([]);
    setShowResult(false);
    setDetectedMood(null);
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
  };

  const progress = currentQuestion >= 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-8 border-white/20 rounded-full"></div>
            <div className="w-32 h-32 border-8 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            <Music className="w-12 h-12 text-white absolute top-10 left-10" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Analyzing Your Vibe...</h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (showResult && detectedMood) {
    const mood = moods[detectedMood];
    const randomSong = mood.songs[Math.floor(Math.random() * mood.songs.length)];
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${mood.bgGradient} flex items-center justify-center p-4`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className={`bg-gradient-to-r ${mood.color} p-6 rounded-full text-white shadow-lg animate-pulse`}>
                {mood.icon}
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {mood.name}
            </h1>
            
            <p className="text-gray-600 text-xl mb-6 max-w-2xl mx-auto">
              {mood.description}
            </p>

            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {mood.tips.map((tip, index) => (
                <span key={index} className={`bg-gradient-to-r ${mood.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md`}>
                  {tip}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Main Song */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Play className="w-6 h-6" />
                Perfect Song for You
              </h2>
              
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${randomSong.id}?autoplay=0&rel=0&modestbranding=1`}
                  title={randomSong.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-bold text-lg">{randomSong.title}</h3>
                <p className="text-gray-600">{randomSong.artist}</p>
              </div>
            </div>

            {/* Additional Recommendations */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                More Songs for Your Mood
              </h3>
              
              <div className="space-y-3">
                {mood.songs.filter(song => song.id !== randomSong.id).map((song, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{song.title}</h4>
                        <p className="text-gray-600 text-sm">{song.artist}</p>
                      </div>
                      <a 
                        href={`https://www.youtube.com/watch?v=${song.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-gradient-to-r ${mood.color} text-white p-2 rounded-full hover:scale-110 transition-transform`}
                      >
                        <Play className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className={`bg-gradient-to-r ${mood.color} text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg flex items-center gap-2 justify-center`}
            >
              <RefreshCw className="w-5 h-5" />
              Retake Quiz
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `My mood is ${mood.name}!`,
                    text: mood.description,
                    url: window.location.href
                  });
                }
              }}
              className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg flex items-center gap-2 justify-center"
            >
              <Star className="w-5 h-5" />
              Share Result
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (currentQuestion === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-full animate-bounce">
              <Music className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            What's Your Mood?
          </h1>
          
          <p className="text-gray-600 text-xl mb-8 leading-relaxed">
            Take our personalized 5-question quiz and discover the perfect song that matches your current vibe! 
            <br />
            <span className="text-lg font-medium">✨ Get instant music recommendations ✨</span>
          </p>

          {savedResults.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <p className="text-sm text-gray-600">
                🎵 You've taken this quiz {savedResults.length} time{savedResults.length > 1 ? 's' : ''} before
              </p>
            </div>
          )}
          
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-2xl"
          >
            Start Your Musical Journey 🎵
          </button>
        </div>
      </div>
    );
  }

  // Quiz Questions
  const question = questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-2">
              <span className="text-2xl">{question.emoji}</span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="font-semibold">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            {question.question}
          </h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-6 text-left bg-gray-50 hover:bg-purple-50 border-2 border-transparent hover:border-purple-300 rounded-2xl transition-all duration-300 hover:scale-[1.02] group hover:shadow-lg"
              >
                <span className="text-gray-800 group-hover:text-purple-700 font-medium text-lg">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Back Button */}
        {currentQuestion > 0 && (
          <div className="text-center">
            <button
              onClick={() => {
                setCurrentQuestion(currentQuestion - 1);
                setAnswers(answers.slice(0, -1));
              }}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              ← Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
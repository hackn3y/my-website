// LandingPage.jsx
// Copy this entire file into your React project

import { useState } from 'react';
import { Code, Rocket, Shield, Zap, CheckCircle, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const projects = [
    {
      title: "AI Stock Market Predictor",
      description: "Full-stack React app with real-time data visualization and AI-powered predictions",
      tech: ["React", "AI/ML", "APIs", "Vercel"],
      link: "https://stocky-mu.vercel.app"
    },
    {
      title: "Portfolio & E-Commerce Site",
      description: "Professional portfolio with integrated shop, blog, and content management",
      tech: ["React", "E-Commerce", "SEO", "Responsive"],
      link: "https://ryanhackney.com"
    }
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "React Web Apps",
      description: "Modern, responsive web applications built with the latest tech"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Portfolio Sites",
      description: "Professional portfolios that get you hired or land clients"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Optimized",
      description: "Google Cybersecurity certified - your site will be safe and fast"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick turnaround with quality code and great communication"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 font-semibold">OSU Engineer • Google Certified</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Build Your Digital Presence
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8">
            I'm Ryan Hackney, a Computer Engineering grad who builds modern web applications that actually work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all cursor-pointer"
            >
              Get Started
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center text-slate-400">
            <a href="https://github.com/yourusername" className="hover:text-white transition-colors cursor-pointer">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/yourusername" className="hover:text-white transition-colors cursor-pointer">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:hello@ryanhackney.com" className="hover:text-white transition-colors cursor-pointer">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-slate-800/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What I Build</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service, idx) => (
              <div key={idx} className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-all">
                <div className="text-blue-400 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-center text-slate-400 mb-12">Real apps I've built - this is the quality you'll get</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  View Live <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Me */}
      <div className="bg-slate-800/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Work With Me?</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "B.S. Computer Engineering from Ohio State University",
              "Google Cybersecurity Professional Certificate",
              "Built production apps with real users",
              "Fast communication - < 24hr response guaranteed",
              "Clean, maintainable code you can actually use",
              "Modern tech stack (React, Next.js, APIs)"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-700/30 p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Let's Build Something</h2>
            <p className="text-center text-slate-400 mb-8">Have a project in mind? Get in touch!</p>
            
            {submitted ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-green-400 font-semibold">Message sent! I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
                <textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-slate-400 mb-4">Or find me on Fiverr:</p>
              <a 
                href="https://fiverr.com/yourusername" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-all cursor-pointer"
              >
                View Fiverr Profile <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2025 Ryan Hackney. Built with React & Tailwind CSS.</p>
          <p className="text-sm mt-2">OSU Computer Engineering Graduate • Google Cybersecurity Certified</p>
        </div>
      </div>
    </div>
  );
}
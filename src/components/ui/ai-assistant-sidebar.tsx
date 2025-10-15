'use client';

import React, { useState } from 'react';
import { AIChat } from './ai-chat';
import { InterviewPreparation } from './interview-preparation';
import { CareerGuidance } from './career-guidance';
import { Resume } from '@/services/resume-service';

interface AIAssistantSidebarProps {
  resumeId: string;
  resume: Resume;
  isOpen: boolean;
  onToggle: () => void;
}

type AIAssistantTab = 'chat' | 'interview' | 'career';

export function AIAssistantSidebar({ resumeId, resume, isOpen, onToggle }: AIAssistantSidebarProps) {
  const [activeTab, setActiveTab] = useState<AIAssistantTab>('chat');

  const tabs = [
    { 
      id: 'chat' as const, 
      label: 'Chat', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ), 
      component: AIChat 
    },
    { 
      id: 'interview' as const, 
      label: 'Interview', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ), 
      component: InterviewPreparation 
    },
    { 
      id: 'career' as const, 
      label: 'Career', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ), 
      component: CareerGuidance 
    },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <>
      {/* Toggle Button - Fixed Position */}
      <button
        onClick={onToggle}
        className={`fixed top-1/2 right-4 z-40 transform -translate-y-1/2 transition-all duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-0'
        }`}
        style={{ 
          right: isOpen ? '400px' : '16px',
          transition: 'right 0.3s ease-in-out'
        }}
      >
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )}
        </div>
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-slate-200 z-30 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">AI Assistant</h2>
            <button
              onClick={onToggle}
              className="text-white hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-sky-600 shadow-lg'
                    : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {ActiveComponent && (
            <ActiveComponent
              resumeId={resumeId}
              resume={resume}
              isOpen={true}
              onClose={onToggle} // Close the entire sidebar
              isSidebarMode={true}
            />
          )}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}

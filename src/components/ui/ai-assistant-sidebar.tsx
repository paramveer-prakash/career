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
    { id: 'chat' as const, label: 'Chat', icon: '🤖', component: AIChat },
    { id: 'interview' as const, label: 'Interview', icon: '🎯', component: InterviewPreparation },
    { id: 'career' as const, label: 'Career', icon: '🚀', component: CareerGuidance },
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
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <span className="text-xl">
            {isOpen ? '✕' : '🤖'}
          </span>
        </div>
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 z-30 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <button
              onClick={onToggle}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="h-full overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
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

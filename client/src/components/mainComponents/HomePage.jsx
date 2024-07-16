import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../index.css';

const HomePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user/currentUser')
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleLogout = () => {
        api.post('/user/logout')
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
      <div class="flex flex-col min-h-[100dvh] bg-background">
        <header class="px-4 md:px-6 py-4 border-b">
          <div class="container max-w-6xl mx-auto flex items-center justify-between">
            <a class="flex items-center gap-2" href="#" rel="ugc">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-6 h-6 text-primary"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
              <span class="font-semibold text-lg">TechTips</span>
            </a>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Get Started
            </button>
          </div>
        </header>
        <main class="flex-1 py-12 md:py-16 lg:py-20">
          <div class="container max-w-6xl mx-auto px-4 md:px-6">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10">
              How can we assist you today?
            </h1>
            <p class="text-muted-foreground text-center max-w-3xl mx-auto mb-10 md:mb-12 lg:mb-14">
              Choose from our available options to get the help you need, whether it's chatting with our AI assistant,
              contacting a human expert, or exploring our resources.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <a
                class="group bg-card rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-card-hover transition-colors"
                href="#"
                rel="ugc"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-10 h-10 mb-4 text-primary group-hover:text-primary-foreground"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                </svg>
                <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-foreground">Chat with AI</h3>
                <p class="text-muted-foreground text-sm group-hover:text-primary-foreground">
                  Get instant answers and assistance from our AI chatbot.
                </p>
              </a>
              <a
                class="group bg-card rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-card-hover transition-colors"
                href="#"
                rel="ugc"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-10 h-10 mb-4 text-primary group-hover:text-primary-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-foreground">Contact Assistant</h3>
                <p class="text-muted-foreground text-sm group-hover:text-primary-foreground">
                  Speak with one of our human experts for personalized assistance.
                </p>
              </a>
              <a
                class="group bg-card rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-card-hover transition-colors"
                href="#"
                rel="ugc"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-10 h-10 mb-4 text-primary group-hover:text-primary-foreground"
                >
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                  <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                </svg>
                <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-foreground">Video Tutorials</h3>
                <p class="text-muted-foreground text-sm group-hover:text-primary-foreground">
                  Explore our library of helpful video tutorials.
                </p>
              </a>
              <a
                class="group bg-card rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-card-hover transition-colors"
                href="#"
                rel="ugc"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-10 h-10 mb-4 text-primary group-hover:text-primary-foreground"
                >
                  <path d="m8 2 1.88 1.88"></path>
                  <path d="M14.12 3.88 16 2"></path>
                  <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path>
                  <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path>
                  <path d="M12 20v-9"></path>
                  <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
                  <path d="M6 13H2"></path>
                  <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
                  <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
                  <path d="M22 13h-4"></path>
                  <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
                </svg>
                <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-foreground">Common Questions</h3>
                <p class="text-muted-foreground text-sm group-hover:text-primary-foreground">
                  Find answers to our most frequently asked questions.
                </p>
              </a>
            </div>
          </div>
        </main>
        <footer class="bg-muted py-6 md:py-8 lg:py-10">
          <div class="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-6 h-6 text-muted-foreground"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
              <span class="text-muted-foreground">© 2023 Acme AI. All rights reserved.</span>
            </div>
            <nav class="flex items-center gap-4">
              <a class="text-muted-foreground hover:text-foreground" href="#" rel="ugc">
                Privacy
              </a>
              <a class="text-muted-foreground hover:text-foreground" href="#" rel="ugc">
                Terms
              </a>
              <a class="text-muted-foreground hover:text-foreground" href="#" rel="ugc">
                Sitemap
              </a>
            </nav>
          </div>
        </footer>
      </div>
    );
};

export default HomePage;

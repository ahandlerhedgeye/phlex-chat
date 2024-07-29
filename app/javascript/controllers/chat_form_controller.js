// app/javascript/controllers/chat_form_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "input", "messagesContainer", "statusIndicator" ]

  connect() {
    console.log("ChatFormController connected")
    this.resetTextareaHeight()
  }

  submit(event) {
    event.preventDefault()
    const message = this.inputTarget.value.trim()
    if (message) {
      console.log("Sending message:", message)
      
      this.addMessageToUI(message, true)
      this.simulateBotResponse(message)

      this.inputTarget.value = ""
      this.resetTextareaHeight()
    }
  }

  handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      this.submit(event)
    }
  }

  resetTextareaHeight() {
    this.inputTarget.style.height = 'auto'
    this.inputTarget.style.height = this.inputTarget.scrollHeight + 'px'
  }

  addMessageToUI(content, fromUser) {
    if (!this.hasMessagesContainerTarget) {
      console.error("Messages container not found")
      return
    }

    const messageElement = document.createElement('div')
    messageElement.classList.add('message', fromUser ? 'user-message' : 'bot-message')
    
    const avatarElement = document.createElement('div')
    avatarElement.classList.add('flex', 'items-center', 'mb-2')
    
    if (fromUser) {
      avatarElement.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2">UN</div>
        <span class="font-semibold">User Name</span>
      `
    } else {
      avatarElement.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">AI</div>
        <span class="font-semibold">AI Assistant</span>
      `
    }
    
    messageElement.appendChild(avatarElement)

    const contentElement = document.createElement('div')
    contentElement.classList.add('message-content')
    contentElement.textContent = content
    messageElement.appendChild(contentElement)

    this.messagesContainerTarget.appendChild(messageElement)

    if (!fromUser) {
      messageElement.classList.add('bot-message-appear')
    }

    this.scrollToBottom()
  }

  simulateBotResponse(userMessage) {
    if (!this.hasMessagesContainerTarget) {
      console.error("Messages container not found")
      return
    }

    const stages = ['Retrieving relevant documents', 'Reranking results', 'Thinking'];
    let currentStage = 0;

    const botMessageElement = document.createElement('div')
    botMessageElement.classList.add('message', 'bot-message', 'bot-message-loading', 'pb-2')
    botMessageElement.innerHTML = `
      <div class="status-indicator text-xs text-gray-500 mb-1">${stages[0]}</div>
      <div class="flex items-center mb-2">
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">AI</div>
        <span class="font-semibold">AI Assistant</span>
      </div>
      <div class="message-content">
        <div class="loading-line"></div>
        <div class="loading-line"></div>
        <div class="loading-line"></div>
      </div>
    `
    this.messagesContainerTarget.appendChild(botMessageElement)
    this.scrollToBottom()

    const statusIndicator = botMessageElement.querySelector('.status-indicator')

    const updateStatus = () => {
      if (currentStage < stages.length) {
        statusIndicator.textContent = stages[currentStage];
        currentStage++;
        setTimeout(updateStatus, 1000); // Move to next stage after 1 second
      } else {
        this.showBotResponse(botMessageElement, userMessage);
      }
    };

    setTimeout(updateStatus, 1000); // Start updating after 1 second
  }

  showBotResponse(botMessageElement, userMessage) {
    botMessageElement.classList.remove('bot-message-loading', 'pb-2')
    botMessageElement.classList.add('bot-message-appear')
    botMessageElement.innerHTML = `
      <div class="flex items-center mb-2">
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">AI</div>
        <span class="font-semibold">AI Assistant</span>
      </div>
      <div class="message-content">I received your message: "${userMessage}"</div>
    `
    this.scrollToBottom()
  }

  scrollToBottom() {
    if (this.hasMessagesContainerTarget) {
      this.messagesContainerTarget.scrollTop = this.messagesContainerTarget.scrollHeight
    }
  }
}
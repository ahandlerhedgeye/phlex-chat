import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["message", "typingIndicator"]

  connect() {
    console.log("ChatMessagesController connected")
    this.animateMessages()
  }

  showTypingIndicator() {
    this.typingIndicatorTarget.classList.remove('hidden')
  }

  hideTypingIndicator() {
    this.typingIndicatorTarget.classList.add('hidden')
  }

  clearChat() {
    this.messageTargets.forEach(message => message.remove())
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark')
  }

  copyMessage(event) {
    const messageContent = event.target.closest('.message').querySelector('.message-content').textContent
    navigator.clipboard.writeText(messageContent).then(() => {
      // Show a brief "Copied" message
      const originalText = event.target.textContent
      event.target.textContent = "Copied!"
      setTimeout(() => {
        event.target.textContent = originalText
      }, 2000)
    })
  }

  regenerateResponse(event) {
    // Implement regenerate functionality
    console.log("Regenerate response")
  }

  animateMessages() {
    this.messageTargets.forEach((message, index) => {
      setTimeout(() => {
        message.classList.add('opacity-100')
        message.classList.remove('opacity-0')
      }, index * 1000) // 1 second delay between messages
    })
  }

  showSource(event) {
    console.log("showSource called", event.params)
    let source
    try {
      source = JSON.parse(event.currentTarget.dataset.chatMessageSourceValue)
    } catch (error) {
      console.error("Error parsing source data:", error)
      return
    }

    if (!source) {
      console.error("Source data is undefined")
      return
    }

    console.log("Parsed source:", source)
    const modal = document.createElement('div')
    modal.classList.add('source-modal')
    modal.innerHTML = `
      <div data_controller="chat-message" class="source-modal-content">
        <h3>${source.title}</h3>
        <p>${source.description}</p>
        <a href="${source.url}" target="_blank">Visit source</a>
        <button data-action="click->chat-message#closeModal">Close</button>
      </div>
    `
    document.body.appendChild(modal)
  }

  closeModal(event) {
    event.target.closest('.source-modal').remove()
  }
}
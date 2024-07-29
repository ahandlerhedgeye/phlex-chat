class ChatComponentPreview < PhlexPreview::ComponentPreview
  def full_page
    render Chat::Component.new(messages: sample_messages, full_page: true)
  end

  def sidebar
    render Chat::Component.new(messages: sample_messages, full_page: false)
  end

  private

  def sample_messages
    [
      { content: "Welcome! How can I assist you today?", from_user: false },
      { content: "Hello, I have a question.", from_user: true },
      { content: "Sure, I'd be happy to help. What's your question?", from_user: false }
    ]
  end
end
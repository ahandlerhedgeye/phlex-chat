module Chat
  class Index < Phlex::HTML
    def initialize(messages:)
      @messages = messages
    end

    def template
      render Chat::Component.new(messages: @messages, full_page: true)
    end
  end
end
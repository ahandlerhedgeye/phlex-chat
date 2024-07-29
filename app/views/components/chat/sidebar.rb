module Chat
  class Sidebar < Phlex::HTML
    def initialize(messages:)
      @messages = messages
    end

    def template
      div class: "chat-sidebar", data_controller: "chat-messages chat-form" do
        render MessagesComponent.new(messages: @messages)
        render InputComponent.new
      end
    end
  end
end
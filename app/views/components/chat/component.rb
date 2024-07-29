module Chat
  class Component < Phlex::HTML
    def initialize(messages:, full_page: true)
      @messages = messages
      @full_page = full_page
    end

    def template
      if @full_page
        div class: "min-h-screen bg-gray-100 flex items-center justify-center p-4" do
          div class: "bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col", 
              data_controller: "chat-form chat-messages" do
            render_chat_content
          end
        end
      else
        div class: "chat-container flex flex-col h-full", 
            data_controller: "chat-form chat-messages" do
          render_chat_content
        end
      end
    end

    private

    def render_chat_content
      render HeaderComponent.new(@full_page)
      div class: "flex-grow overflow-y-auto" do
        render MessagesComponent.new(messages: @messages)
      end
      render InputComponent.new
    end
  end
end
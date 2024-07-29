class ChatController < ApplicationController
  
  def index
    # tes messages
    @messages = [
      { content: "Welcome! How can I assist you today?", from_user: false },
      { content: "Can you tell me about the history of Rome?", from_user: true },
      { 
        content: "Certainly! Rome was founded in 753 BCE according to legend[1]. It grew from a small town on the Tiber River into a vast empire that dominated the Mediterranean world[2].",
        from_user: false,
        sources: [
          { title: "Foundation of Rome", description: "Legend of Romulus and Remus", url: "https://example.com/rome-foundation" },
          { title: "Roman Empire", description: "Overview of Roman history", url: "https://example.com/roman-empire" }
        ]
      }
    ]
    render Layouts::Application.new(Chat::Index.new(messages: @messages))
  end

  def sidebar
    @messages = [
      { content: "Welcome! How can I assist you today?", from_user: false },
      { content: "Hello, I have a question about the content.", from_user: true },
      { content: "Sure, I'd be happy to help. What's your question about the content?", from_user: false }
    ]
    render Layouts::Application.new(Chat::Sidebar.new(messages: @messages))
  end

  def sidebar_demo
    render Layouts::WithChatSidebar.new(main_content: video_demo_component)
  end

  private

  def video_demo_component
    Class.new(Phlex::HTML) do
      def template
        div class: "video-container" do
          h1 class: "text-2xl font-bold mb-4" do
            plain "Video Content Placeholder"
          end
          div class: "aspect-w-16 aspect-h-9 bg-gray-300 flex items-center justify-center" do
            div class: "text-4xl text-gray-500" do
              plain "Video Player"
            end
          end
        end
      end
    end.new
  end
end
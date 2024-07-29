module Layouts
  class WithChatSidebar < Phlex::HTML
    include Phlex::Rails::Helpers::CSRFMetaTags
    include Phlex::Rails::Helpers::AssetPath
    include Phlex::Rails::Helpers::CSPMetaTag
    include Phlex::Rails::Helpers::StylesheetLinkTag
    include Phlex::Rails::Helpers::JavascriptImportmapTags


    def initialize(main_content:)
      @main_content = main_content
    end

    def template
      html lang: "en" do
        head do
          meta charset: "UTF-8"
          meta name: "viewport", content: "width=device-width, initial-scale=1.0"
          title { "Your App Name" }
          csrf_meta_tags
          csp_meta_tag
          javascript_importmap_tags
          stylesheet_link_tag "tailwind", "data-turbo-track": "reload"
        end
        body class: "flex h-screen" do
          main class: "flex-grow overflow-auto p-6" do
            render @main_content
          end
          div class: "w-1/3 border-l border-gray-200" do
            render Chat::Sidebar.new(messages: [])  # Initially empty
          end
        end
      end
    end
  end
end
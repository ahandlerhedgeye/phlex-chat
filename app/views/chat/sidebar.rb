module Chat
  class Sidebar < Phlex::HTML
    include Phlex::Rails::Helpers::CSRFMetaTags
    include Phlex::Rails::Helpers::AssetPath
    include Phlex::Rails::Helpers::CSPMetaTag
    include Phlex::Rails::Helpers::StylesheetLinkTag
    include Phlex::Rails::Helpers::JavascriptIncludeTag

    def initialize(messages:)
      @messages = messages
    end

    def template
      div class: "chat-sidebar" do
        render Chat::Component.new(messages: @messages, full_page: false)
      end
    end
  end
end
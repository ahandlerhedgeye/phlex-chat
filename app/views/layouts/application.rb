module Layouts
  class Application < Phlex::HTML
    include Phlex::Rails::Helpers::CSRFMetaTags
    include Phlex::Rails::Helpers::AssetPath
    include Phlex::Rails::Helpers::CSPMetaTag
    include Phlex::Rails::Helpers::StylesheetLinkTag
    include Phlex::Rails::Helpers::JavascriptImportmapTags

    def initialize(content)
      @content = content
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
        body do
          main do
            render @content
          end
        end
      end
    end
  end
end
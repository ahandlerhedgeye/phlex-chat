module Chat
  class StatusComponent < Phlex::HTML
    def initialize(status:)
      @status = status
    end

    def template
      div class: "chat-status" do
        plain @status
      end
    end
  end
end
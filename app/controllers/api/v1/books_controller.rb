module Api
  module V1
    class BooksController < ApiController
      def index
        render json: {
          id: 1,
          name: "lite"
        }
      end

      def create

      end

      def update

      end

      def delete

      end
    end
  end
end

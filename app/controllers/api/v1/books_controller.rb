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
        Book.find_or_create_by(title: params[:title], google_id: params[:id], status: :in_stock, inventory: 1)
        render json: {
          success: true,
          msg: 'success'
        }, status: 201
      end

      def update

      end

      def delete

      end
    end
  end
end

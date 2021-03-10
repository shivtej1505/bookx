module Api
  module V1
    class BooksController < ApiController
      def index
        render json: Book.in_stock.select(:id, :google_id, :status, :inventory), status: 200
      end

      def create
        Book.find_or_create_by(title: params[:title], google_id: params[:id], status: :in_stock, inventory: 1)
        render json: {
          success: true,
          msg: 'success'
        }, status: 201
      end

      def update
        book = Book.find(params[:id])
        book.update(params.permit(:title, :status, :inventory))
        render json: {
          success: true,
          msg: 'success'
        }, status: 200
      end

      def delete
        book = Book.find(params[:id])
        book.destroy!
        render json: {
          success: true,
          msg: 'success'
        }, status: 200
      end
    end
  end
end

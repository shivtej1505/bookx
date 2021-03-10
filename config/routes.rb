Rails.application.routes.draw do
  root to: "books#main"
  get "/books" => "books#manage_books"

  namespace :api do
    namespace :v1 do
      # Remove unnecessary routes??
      resources :books, only: [:index, :create, :update, :destroy]
    end
  end

  # On 400/500, redirect properly
end

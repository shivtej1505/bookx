Rails.application.routes.draw do
  root to: "books#main"
  # TODO: "/manage-books" or something like that?
  get "/books" => "books#index"

  namespace :api do
    namespace :v1 do
      # Remove unnecessary routes??
      resources :books, only: [:index, :create, :update, :destroy]
    end
  end

  # On 400/500, redirect properly
end

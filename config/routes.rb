Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    get "profile", to: "users#show"

    resource :session, only: [:create, :destroy]

    resources :restaurants, except: [:new, :edit] do
      resources :tables, only: [:index, :create, :update]
      resources :reviews, only: [:create, :update]
      post "/favorite", to: "restaurants#create_favorite"
    end

    get "search", to: "restaurants#search"

    resources :tables, only: [:destroy]
    resources :reviews, only: [:destroy]
    resources :favorites, only: [:destroy]

    resources :categories, only: [:index]
  end
end

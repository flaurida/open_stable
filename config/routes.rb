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
      resources :favorites, only: [:create]
      resources :photos, only: [:create]

      delete "favorites", to: "favorites#destroy"
    end

    get "search", to: "restaurants#search"
    get "query", to: "restaurants#find_by_name"

    resources :tables, only: [:destroy]

    resources :bookings, only: [:create, :destroy]
    resources :reviews, only: [:destroy]
  end
end

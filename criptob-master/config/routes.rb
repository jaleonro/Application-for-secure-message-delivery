Rails.application.routes.draw do
  resources :criptos do
    resources :messages
  end

  post '/messages/read' => 'criptos#read'  
  post '/chanels/search' => 'chanels#search'
  
  post '/msgchanels/read' => 'msgchanels#read'  
  
  
  resources :messages
  resources :chanels, only: [:show , :create, :index] do
    resources :msgchanels, only:[:show , :create]
  end 

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
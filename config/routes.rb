Rails.application.routes.draw do
  root to: "ideas#show"

  resources :ideas, except: [:show]

  put 'ideas/thumbsup/:id', to: 'ideas#thumbsup'
  put 'ideas/thumbsdown/:id', to: 'ideas#thumbsdown'
end

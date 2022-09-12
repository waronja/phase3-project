class ApplicationController < Sinatra::Base
    set :default_content_type, "application/json"

  # Add routes
  get "/meals" do
    meals = Meal.all
    meals.to_json
  end
end
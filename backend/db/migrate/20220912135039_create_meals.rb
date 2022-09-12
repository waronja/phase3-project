class CreateMeals < ActiveRecord::Migration[6.1]

  def change
    create_table :meals do |t|
      t.string :strMeal
      t.string :strInstructions
      t.string :strMealThumb

    end
  end
end

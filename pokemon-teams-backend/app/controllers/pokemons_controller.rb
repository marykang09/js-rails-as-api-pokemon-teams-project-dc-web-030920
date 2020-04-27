class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons.as_json(include: :trainer)
    end

    def create
        pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: species = Faker::Games::Pokemon.name, trainer_id: params["pokemon"]["trainer_id"])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemons
    end
    
end

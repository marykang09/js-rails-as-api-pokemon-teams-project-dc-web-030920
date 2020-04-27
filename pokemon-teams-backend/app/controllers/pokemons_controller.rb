class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons.as_json(include: :trainer)
    end
    
end

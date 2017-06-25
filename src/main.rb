require 'sinatra'
require 'sinatra/json'
require 'sinatra/content_for'
require 'sequel'
require 'sequel/plugins/json_serializer'

set :haml, :format => :html5

DB = Sequel.connect('mysql://Jogo:Jogo@localhost/BeyondInfinity')

DB.create_table?(:systems) do
  primary_key :id
  String :name
end

DB.create_table?(:planets) do
  primary_key :id
  String :name
  Integer :owner
  foreign_key :system_id, :systems
end

class Planet < Sequel::Model
  plugin :json_serializer

  many_to_one :system
end

class System < Sequel::Model
  plugin :json_serializer

  one_to_many :planets
end

get '/' do
  haml :index
end

get '/lobby' do
  haml :lobby
end

get '/planets' do
  planets = Planet.dataset

  json planets
end

get '/systems' do
  systems = System.dataset

  json systems
end

get '/systems/:id' do |id|
  system = System.dataset.where(:id => id).first()
  planets = system.planets

  system_with_planets = {:system => system, :planets => planets}

  json system_with_planets
end

put '/systems/:id/capture' do |id|
  system = System[id]

  return json({ message: 'fail' }) if system.nil?

  system.update(:owner => 0)
  json ({ message: 'ok' })
end

class IdeasController < ApplicationController
  respond_to :json

  def index
    @ideas = Idea.all.each { |idea| idea.body = idea.truncate  }
    respond_with @ideas.reverse
  end

  def show
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def update
    Idea.update(params[:id].to_i, idea_params)
    redirect_to "/"
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def edit
    @idea = Idea.find(params["id"])
  end

  def thumbsup
    @idea = Idea.find(params[:id])
    @idea.up
    @idea.save
    respond_with @idea
  end


  def thumbsdown
    @idea = Idea.find(params[:id])
    @idea.down
    @idea.save
    respond_with @idea
  end

  private

  def idea_params
      params.require(:idea).permit(:title, :body, :quality_id)
  end
end

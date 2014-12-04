class LensesController < ApplicationController
  def new
    # Serve a page with elements that can be connected
  end

  def create
    tag = params[:tag]
    @lens = Lens.create(tag: tag)
    render inline: "<%= @lens.id %>"
  end

  def show
    @id = params[:id]
    @lens = Lens.find(@id)
  end

end

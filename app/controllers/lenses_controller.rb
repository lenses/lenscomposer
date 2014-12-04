class LensesController < ApplicationController
  def new
    # Serve a page with elements that can be connected
  end

  def create
    @lens = Lens.create(tag_params)
    render inline: "<%= @lens.id %>"
  end

  def show
    @id = params[:id]
    @lens = Lens.find(@id)
  end

  private

  def tag_params
    params.require(:taginfo).permit(:tag, :tagname, :currentstate)
  end

end

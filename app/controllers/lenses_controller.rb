class LensesController < ApplicationController
  def new
    # Serve a page with elements that can be connected
    @components = Component.components.to_json

  end

  def create
    @lens = Lens.create
    @lens.components << Component.create(tag_params)
    render inline: "<%= @lens.id %>"

  end

  def show
    @id = params[:id]
    @lens = Lens.find(@id)
    final_result = @lens.components[0] # TODO: update to select the component with class final result when saving all components to lens
    @final_result_html = final_result.generate_html_tag
  end

  def edit

  end

  private

  def tag_params
    params.require(:lensinfo).permit(:tag, :tagname, :currentstate, :classlist)
  end

end

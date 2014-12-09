class LensesController < ApplicationController
  def new
    # Serve a page with elements that can be connected
    @component_list = Component.components.to_json
    @lens = Lens.new
    @lens.components.build
  end

  def create
    @lens = Lens.create(lens_params)
    render inline: "<%= @lens.id %>"
  end

  def show
    @id = params[:id]
    @lens = Lens.find(@id)
    final_result = @lens.components.select{|component| component.final_result}[0]
    # debugger
    @final_result_html = final_result.generate_html_tag
  end

  def edit
    @component_list = Component.components.to_json
    @lens = Lens.find(params[:id])
    @components = @lens.components.map { |component| component.generate_html_tag }
  end

  def update
    @lens = Lens.find(lens_params[:id])
    @lens.update(lens_params)
    render inline: "<%= @lens.id %>"
    debugger

  end

  private

  def lens_params
    params.require(:lens).permit(:id, :components_attributes=>[:id, :tagname, :currentstate, :classlist, :final_result])
  end

end

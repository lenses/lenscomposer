class Lens < ActiveRecord::Base
  has_many :components

  @@components = [
      { "name"=> "th-table-data", "friendly"=> "Data Table", "category"=> "Data Input" },
        { "name"=> "th-csv", "friendly"=> "CSV", "category"=> "Data Input" },
        { "name"=> "th-enigma", "friendly"=> "Enigma", "category"=> "Data Input" },
        { "name"=> "th-array-function", "friendly"=> "Array function (custom JS)", "category"=> "Data Manipulate" },
        { "name"=> "th-geocoder-firebase", "friendly"=> "Geocoder", "category"=> "Data Maniplate" },
        { "name"=> "th-chart-data-filter", "friendly"=> "Filter Data for Charts", "category"=> "Data Maniplate" },
        { "name"=> "th-n-bar-chart", "friendly"=> "Bar Chart", "category"=> "Charts" },
        { "name"=> "th-n-bar-chart-horizontal", "friendly"=> "Horizontal Bar Chart", "category"=> "Charts"},
        { "name"=> "th-geocoder-firebase", "friendly"=> "Geocoder", "category"=> "Data Maniplate" },
        { "name"=> "th-chart-data-filter", "friendly"=> "Filter Data for Charts", "category"=> "Data Maniplate" },
        { "name"=> "th-n-bar-chart", "friendly"=> "Bar Chart", "category"=> "Charts" },
        { "name"=> "th-n-bar-chart-horizontal", "friendly"=> "Horizontal Bar Chart", "category"=> "Charts"},
        { "name"=> "th-n-peak-chart", "friendly"=> "Pyramid Chart", "category"=> "Charts" },
        { "name"=> "th-google-scatter-bubble", "friendly"=> "Scatter Bubble Chart", "category"=> "Charts" },
        { "name"=> "th-google-pie", "friendly"=> "Pie Chart", "category"=> "Charts" },
        { "name"=> "th-google-line", "friendly"=> "Multi-line Chart", "category"=> "Charts" },
        { "name"=> "th-spectrum-chart", "friendly"=> "Spectrum Chart", "category"=> "Charts" },
        { "name"=> "th-stacked-chart", "friendly"=> "Stacked Chart", "category"=> "Charts" },
        { "name"=> "th-google-map", "friendly"=> "Google Map", "category"=> "Maps" },
        { "name"=> "th-mapbox", "friendly"=> "Mapbox Map", "category"=> "Maps" },
        { "name"=> "th-map-us", "friendly"=> "US Map", "category"=> "Maps" },
        { "name"=> "th-google-regions", "friendly"=> "World/Region Map", "category"=> "Maps" }
    ]

end

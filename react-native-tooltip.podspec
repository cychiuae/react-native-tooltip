require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
version = package['version']

source = { :git => 'https://github.com/louischan-oursky/react-native-tooltip.git' }
source[:tag] = version

Pod::Spec.new do |s|
  s.name = 'react-native-tooltip'
  s.version = version
  s.homepage = 'https://github.com/louischan-oursky/react-native-tooltip'
  s.summary = 'react-native-tooltip'
  s.authors = { 'chirag04' => 'jain_chirag04@yahoo.com' }
  s.license = package['license']
  s.platform = :ios, "8.0"
  s.source = source
  s.preserve_paths = "package.json", "ToolTipText.ios.js", "ToolTipText.android.js", "index.js"
  s.source_files = "ToolTipMenu/**/*.{h,m}"
  s.dependency "React"
end

require 'haml'
require 'fileutils'
require 'fssm'

def haml file
	dir_name  = File.dirname(file)
	out_name  = File.basename(file,'.haml') + ".html"
	%x{ haml #{file} #{File.join(dir_name, out_name)} }
end

def haml_watcher
	FSSM.monitor do
		
		path './' do
			glob '**/*.haml'

			update do |base, relative|
				haml File.join(base,relative)
			end

			create do |base, relative|
				haml File.join(base,relative)
			end
		end

	end
end

desc 'Build haml files'
task :build_haml do
	Dir.glob("./**/*.haml") do |file|
		haml(file)
	end
end

desc 'Build sass files'
task :build_sass do
	sh "sass --update sass:css"
end

desc 'Build all haml and sass files then build jekyll site'
task :build => [:build_sass, :build_haml] do
	sh "jekyll build"
end

desc 'Clean all the files'
task :clean do
	if File.exist?('./_site') then FileUtils.rm_rf './_site' end
	if File.exist?('./css')   then FileUtils.rm_rf './css' end
	FileUtils.rm Dir.glob('./**/*.html')
end

desc "Launch Jekyll server"
task :serve => :build do
	haml  = Thread.new { haml_watcher }
	server = Thread.new { sh "jekyll serve -w"}
	sass = Thread.new { sh "sass --watch sass:css" }
	haml.join
	server.join
	sass.join

	trap "INT" do
		Thread.kill (haml)
		Thread.kill (sass)
		Thread.kill (server)
	end
end

desc "Create a new post"
task :new_post, :title do |t, args|
	if args.title
		title = args.title
	else
		title = get_stdin("Title for the post: ")
	end
	filename = "_posts/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.markdown"
	if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "comments: true"
    post.puts "categories: "
    post.puts "---"
  end
end
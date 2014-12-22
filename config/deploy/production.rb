# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :app, %w{deployer@makelenses.com}
role :web, %w{deployer@makelenses.com}
role :db, %w{deployer@makelenses.com}


# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

server 'makelenses.com', user: 'deployer', roles: %w{web app}


# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult[net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start).
#
# Global options
# --------------
 set :ssh_options, {
   user: 'deployer',
   password: 'thelma2014',
   forward_agent: false,
   auth_methods: %w(password)
 }

namespace :deploy do
  after :finished,  :lens_setup do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      within current_path do
        with rails_env: :production do
          execute :rake, 'assets:precompile'
          execute :rake, 'db:migrate'
          execute 'bower update'
        end
      end
    end
  end
end
# And/or per server (overrides global)
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }

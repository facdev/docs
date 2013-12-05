(function() {
    var repo = 'docs', lang = 'ru';
    $('title').text('Запрашиваемая страница не найдена');

    $DOC.onload(function() {
        var div = $DOC.cbody.add('div`mar20');
        div
            ._add('h1', 'Запрашиваемая страница не найдена!')
            ._add('hr')
            ._add('h3', 'Вы можете создать новую страницу по этому адресу')
            ._add('create:bootstrap.Button`martop5', 'Добавить страницу в собственном репозитории', function(btn) {
                btn.listen('click', function() {
                    PubSettings();
                });
            })
            ._add('br')
            ._add('fork:bootstrap.Button`martop5', 'Создать Fork этого репозитория');
        div.createElement($DOC.sections['fixed-top-bar'], 3);
    });
    
    function PubSettings() {
        var _this = this;
        var modal = $DOC.cbody.add(githubSettingsModalForm());
            modal.createElement();
        modal.user.value = location.host.split('.')[0];  
        modal.repo.value = location.pathname.split('/')[1];
        modal.branch.value = 'gh-pages';
        var apikey = modal.apikey.value = sessionStorage.getItem('github-apikey') || '';
            
        var // /repo/path
            names = getMwFileName({fileName:location.pathname.split('/').slice(2).join('/')});
        modal.path.value = names.fileName;
                
        
        modal.ok.listen('click', function() {
            if (modal.apikey.value !== apikey) {
                apikey = modal.apikey.value;
                sessionStorage.setItem('github-apikey', apikey);
            }
            
            $.get('/' + repo + '/' + lang + '/page_template.html', function(data) {
                if (modal.user.value && modal.repo.value && modal.branch.value && modal.path.value && apikey) {
                    
                    var githubapi = new window.github_api({
                        username: modal.user.value,
                        password: apikey,
                        auth: "basic"
                    });

                    var repo = githubapi.getRepo(modal.user.value, modal.repo.value);
                        
//
//            if (host.fileMode) {
//                var html = preview.grabHTML();
//                    repo.write(modal.branch.value, names.mwFileName, data, '---', function(err) {
//                        if (err) console.log(err);
//                    });
//                // simultaneous api requests not supported, delay 3 sec
//                setTimeout(function() {
//                    repo.write(github.branch, names.fileName, html, '---', function(err) {
//                        if (err) console.log(err);
//                        else
//                            close();
//                    });
//                }, 3000);
//            } else {
                    repo.write(modal.branch.value, names.fileName, data, '---', function(err) {
                        if (err) console.log(err);
                        else
                            close();
                    });
//            }
                    
                }

            });
            
//            var github = daoroot.github || (daoroot.github = {});
//            github.user = modal.user.value || '';
//            sessionStorage.setItem('github-apikey', modal.apikey.value || ''),
//            github.repo = modal.repo.value || '';
//            github.branch = modal.branch.value || 'gh-pages';
//            daoroot.raise();
//            daourl.github_path = modal.path.value || '';
//            daourl.raise();
//            $(modal.element).modal('hide');
              
        });
        modal.cancel.listen('click', close);
        modal.close.listen('click', close);
        function close() {
            $(modal.element).modal('hide');
            setTimeout(function() {
                modal.deleteAll();
                modal.remove();
            }, 0);
        }
        
        $(modal.element).modal('show');
        
        
        function githubSettingsModalForm() {
            var modal = controls.create('bootstrap.modal', {style:'z-index:1200;'});
            modal.close = modal.header.add('button`close', '&times;', {type:'button'});
            modal.header.add('h4`modal-title', 'Publish on GitHub');
            modal.body
                .add('bootstrap.Form')
                ._add('bootstrap.FormGroup', function(grp) {
                    grp.add('bootstrap.ControlLabel', 'Username:');
                    modal.user = grp.add('bootstrap.ControlInput');
                })
                ._add('bootstrap.FormGroup', function(grp) {
                    grp._add('bootstrap.ControlLabel', 'Repository:');
                    modal.repo = grp.add('bootstrap.ControlInput');
                })
                ._add('bootstrap.FormGroup', function(grp) {
                    grp._add('bootstrap.ControlLabel', 'Branch:');
                    modal.branch = grp.add('bootstrap.ControlInput');
                })
                ._add('bootstrap.FormGroup', function(grp) {
                    grp._add('bootstrap.ControlLabel', 'Path in repository:');
                    modal.path = grp.add('bootstrap.ControlInput');
                })
                ._add('bootstrap.FormGroup', function(grp) {
                    grp._add('bootstrap.ControlLabel', 'API key:');
                    modal.apikey = grp.add('bootstrap.ControlInput');
                });
            modal.ok = modal.footer.add('bootstrap.Button#primary', 'OK');
            modal.cancel = modal.footer.add('bootstrap.Button', 'Cancel');
            return modal;
        }
    }
    
    function getMwFileName(data) {
        var fileName = data.fileName, mwFileName = data.mwFileName;
        if (!fileName)
            return data;
        // location != *.html
        if (fileName.slice(-5) !== '.html') {
            return getMwFileName({fileName:fileName + '.html'});
        }
        // location == *.mw.html
        else if (fileName.slice(-8) === '.mw.html') {
            fileName = fileName.slice(0, fileName.length - 8);
            mwFileName = fileName + '.mw.html';
            fileName += '.html';
        } else {
            mwFileName = fileName.slice(0, fileName.length - 5) + '.mw.html';
        }
        data.fileName = fileName;
        data.mwFileName = mwFileName;
        return data;
    }
})();
'use strict';

!function () {
    var view = document.querySelector('section.message');

    var model = {
        init: function init() {
            var APP_ID = 'AAnijDKsSjmjCeLvXIz2xtrb-gzGzoHsz';
            var APP_KEY = 'TyisuXFL3yYz6RDpsMrq2Kuh';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        //获取数据
        fetch: function fetch() {
            var query = new AV.Query('Message');
            return query.find();
        },
        //保存数据
        save: function save(name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                'name': name,
                'content': content
            });
        }

    };

    var controller = {
        view: null,
        model: null,
        messageList: null,
        form: null,
        init: function init(view, model) {
            this.view = view;
            this.model = model;

            this.form = view.querySelector('#postMessageForm');
            this.messageList = view.querySelector('#messageList');
            this.model.init();
            this.loadMessages();
            this.bindEvents();
        },

        loadMessages: function loadMessages() {
            this.model.fetch().then(function (messages) {
                var array = messages.map(function (item) {
                    return item.attributes;
                });
                console.log(array);
                array.forEach(function (item) {
                    var li = document.createElement('li');
                    li.innerText = item.name + ':' + item.content;
                    var messageList = document.querySelector('#messageList');
                    messageList.appendChild(li);
                });
            }, function (error) {
                alert('提交失败');
            });
        },
        bindEvents: function bindEvents() {
            var _this = this;

            this.form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!_this.form.querySelector('input').value.length) {
                    _this.form.querySelector('input').disabled = 'disabled';alert('请输入内容');
                } // 含有disabled属性的表单字段将不会被提交
                else {
                        _this.saveMessage();
                    }
            });
        },
        saveMessage: function saveMessage() {
            var myForm = this.form;
            var name = myForm.querySelector('input[name=name]').value;
            var content = myForm.querySelector('input[name=content]').value;
            this.model.save(name, content).then(function (object) {
                var li = document.createElement('li');
                li.innerText = object.attributes.name + ':' + object.attributes.content;
                var messageList = document.querySelector('#messageList');
                messageList.appendChild(li);
                myForm.querySelector('input[name=content]').value = '';
            });
        }
    };
    controller.init(view, model);
}.call();
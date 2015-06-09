AJS.toInit(function(E){var B,K,J;var A=/^\w+:\/\/[^\/?#]+/.exec(location.href),G;AJS.Editor.Adapter.addOnInitCallback(function(){I(AJS.Editor.Adapter.getMainEditor())});AJS.Editor.Adapter.fullscreenEditorOnInitCallbacks.push(function(){I(AJS.Editor.Adapter.getFullScreenEditor())});var H=function(L){if(AJS.DragAndDropUtils.isGearsInstalledNoPrompt()){D()}AJS.DragAndDropUtils.bindDragEnter(L);AJS.DragAndDropUtils.bindDragOver(L,function(O){if(E.browser.mozilla){var M=AJS.Editor.Adapter.getEditor().dom.getViewPort(tinyMCE.activeEditor.getWin());var N=document.createRange();N.setStart(O.rangeParent,O.rangeOffset);N.setEnd(O.rangeParent,O.rangeOffset);AJS.Editor.Adapter.bookmark={scrollX:M.x,scrollY:M.y,range:N}}});AJS.DragAndDropUtils.bindDrop(L,function(N){var M=function(R){if(!AJS.DragAndDropUtils.isGearsInstalledNoPrompt()){AJS.DragAndDropUtils.preventDefault(R);AJS.DragAndDropUtils.stopPropagation(R);var O=new AJS.Dialog(500,250,"enabling-drag-and-drop");O.addHeader(AJS.DragAndDrop.i18n["editor.install.dialog.header"]);O.addPanel("Panel 1","<div>"+AJS.DragAndDrop.i18n["editor.install.dialog.desc1"]+"</div><p><button class='save-draft-button'>"+AJS.DragAndDrop.i18n["editor.install.dialog.save.draft.button"]+"</button>&nbsp;<span class='save-draft-status'></span></p><p>"+AJS.DragAndDrop.i18n["editor.install.dialog.desc2"]+"</p>");O.addButton(AJS.DragAndDrop.i18n["editor.install.dialog.proceed"],function(S){AJS.Editor.handleBeforeUnload=function(){};AJS.DragAndDropUtils.isGearsInstalledWithPermissions({returnUrl:A+AJS.Editor.getResumeDraftUrl()})},"proceed-with-install-button");E(".proceed-with-install-button").attr("disabled","disabled");O.addButton(AJS.DragAndDrop.i18n["dialog.button.cancel"],function(S){S.hide()});E("#enabling-drag-and-drop .save-draft-button").click(C);O.show();return }var Q=AJS.DragAndDropUtils.getFilesFromDropEvent(R);if(Q&&!!Q.length){var P=B.upload([Q[0]]);if(!K){K=new AJS.DragAndDropProgressDialog({header:AJS.DragAndDrop.i18n["editor.dialog.header"],height:180});
K.cancelListeners.push(function(T,S){B.cancel(S.workId)})}K.render(P[0]);!E.browser.mozilla&&AJS.Editor.Adapter.storeCurrentSelectionState();K.show()}};if(E.browser.msie){N=N||window.event;if(!J){E("<div id='tempDropZoneForIE' style='display: none'></div>").appendTo("body");J=E("#tempDropZoneForIE")[0];AJS.DragAndDropUtils.bindDragEnter(J);AJS.DragAndDropUtils.bindDragOver(J);AJS.DragAndDropUtils.bindDrop(J,M)}J.fireEvent("ondragenter",N);J.fireEvent("ondragover",N);J.fireEvent("ondrop",N)}else{M(N)}})};function D(){if(!B){B=new AJS.GearsUploadManager(AJS.DragAndDropUtils.getCachingUrl("/download/resources/com.atlassian.confluence.plugins.drag-and-drop:upload-worker/upload-worker.js"));B.addOnSuccessHandler(function(L){AJS.Editor.Adapter.restoreSelectionState();AJS.Editor.Adapter.getEditor().execCommand("mceInsertContent",false,L.data.htmlForEditor);AJS.Editor.Adapter.storeCurrentSelectionState()});B.addOnSuccessHandler(function(L){K.renderComplete(L.workId)});B.addOnErrorHandler(function(L){L.data.actionErrors&&L.data.actionErrors[0]&&K.renderError(L.workId,L.data.actionErrors[0])});B.addOnProgressHandler(function(L){K.renderUpdateToBytesUploaded(L.workId,L.bytesUploaded,L.fileSize)});B.addOnProgressHandler(function(){K.disableCloseButton(AJS.DragAndDrop.i18n["upload.in.progress"])});B.addOnIdleHandler(function(){K.enableCloseButton(AJS.DragAndDrop.i18n["http://10.20.160.198/wiki/s/en/2166/34/1.0.16/_/download/batch/com.atlassian.confluence.plugins.drag-and-drop:drag-and-drop-for-editor/dialog.button.done"]);if(!K.hasErrors()){setTimeout(function(){K.hide();K.clearRenderOutput();AJS.Editor.Adapter.restoreSelectionState()},1000)}});B.addOnCancelHandler(function(L){K.renderCancelled(L)})}}var F=function(L){var N=document.createElement("div");N.setAttribute("id","filuploadShim");document.body.appendChild(N);var M=new plupload.Uploader({runtimes:"html5",dragdrop:true,drop_element:L,browse_button:N,multipart:false,max_file_size:+AJS.params.globalSettingsAttachmentMaxSize});if(!K){K=new AJS.DragAndDropProgressDialog()}M.init();M.bind("FilesAdded",function(O,R){for(var P=0,Q=R.length;P<Q;P++){K.render({workId:R[P].id,status:R[P].status,file:R[P]})
}M.start()});M.bind("BeforeUpload",function(P,R){if(E.browser.mozilla){var O=AJS.Editor.Adapter.getEditor().dom.getViewPort(tinyMCE.activeEditor.getWin());AJS.Editor.Adapter.bookmark={scrollX:O.x,scrollY:O.y,range:tinyMCE.activeEditor.getWin().getSelection().getRangeAt(0)}}var Q=A+AJS.General.getContextPath()+"/plugins/drag-and-drop/upload.action";var S=AJS.params.pageId!=0?{pageId:AJS.params.pageId}:{draftType:AJS.params.draftType},T=R.name.substr(R.name.lastIndexOf(".")+1);S.filename=R.name;S.size=R.size;S.mimeType=plupload.mimeTypes[T.toLowerCase()]||"application/octet-stream";P.settings.url=plupload.buildUrl(Q,S);K.cancelListeners.push(function(W,U){var V=P.getFile(U.workId);V&&P.cancelFile(V)});!E.browser.mozilla&&AJS.Editor.Adapter.storeCurrentSelectionState();K.show()});M.bind("UploadProgress",function(O,P){K.renderUpdateToBytesUploaded(P.id,P.loaded,P.size);K.disableCloseButton(AJS.DragAndDrop.i18n["upload.in.progress"])});M.bind("FileUploaded",function(P,R,Q){if(Q.response){try{var O=AJS.$.parseJSON(Q.response);AJS.Editor.Adapter.restoreSelectionState();AJS.Editor.Adapter.getEditor().execCommand("mceInsertContent",false,O.htmlForEditor);AJS.Editor.Adapter.storeCurrentSelectionState()}catch(S){}}K.renderComplete(R.id)});M.bind("FilesRemoved",function(O,Q){for(var P=0,R=Q.length;P<R;P++){if(Q[P].status==plupload.CANCELLED){K.renderCancelled(Q[P].id)}}});M.bind("Error",function(P,Q){var O,R;if(Q.response){try{O=AJS.$.parseJSON(Q.response);R=O.actionErrors[0]}catch(S){R=Q.message}}else{R=Q.message;if(Q.code==plupload.FILE_SIZE_ERROR){R=AJS.format(AJS.DragAndDrop.i18n["validation.file.too.large"],AJS.DragAndDropUtils.niceSize(Q.file.size).toString(),AJS.DragAndDropUtils.niceSize(AJS.params.globalSettingsAttachmentMaxSize).toString());K.render({workId:Q.file.id,status:Q.file.status,file:Q.file});K.show()}}K.renderError(Q.file.id,R)});M.bind("UploaderIdle",function(){if(!M.total.queued){M.stop();K.enableCloseButton(AJS.DragAndDrop.i18n["http://10.20.160.198/wiki/s/en/2166/34/1.0.16/_/download/batch/com.atlassian.confluence.plugins.drag-and-drop:drag-and-drop-for-editor/dialog.button.done"]);if(!K.hasErrors()){setTimeout(function(){K.hide();
K.clearRenderOutput();AJS.Editor.Adapter.restoreSelectionState()},1000)}}})};function I(L){var M=L.getBody();var N=function(){var P=E(M),Q=E("#"+L.id+"_ifr").innerHeight();if(P.height()<Q){var O=P.innerHeight()-P.height();P.height((Q-O)*0.95)}else{P.height("")}};N();L.onChange.add(N);AJS.DragAndDropUtils.init(function(O){if(O){F(M)}else{H(M)}})}function C(){var M=E(".save-draft-status");AJS.Editor.saveDraft({onSuccessHandler:function(N){M.css({color:"#090","font-weight":"bold"});M.html(AJS.format(AJS.DragAndDrop.i18n["draft.saved"],N.time));E(".proceed-with-install-button").removeAttr("disabled")},onErrorHandler:function(N){M.css({color:"#c00","font-weight":"bold"});M.html(N)},forceSave:true});var L=E(this);L.attr("disabled","disabled");L.unbind("click",arguments.callee)}});
AJS.toInit(function(C){var A,E;AJS.DragAndDrop.defaultDropHandler=function(H){if(!AJS.DragAndDropUtils.isGearsInstalledWithPermissions()){AJS.DragAndDropUtils.preventDefault(H);AJS.DragAndDropUtils.stopPropagation(H);return }var G=AJS.DragAndDropUtils.getFilesFromDropEvent(H);if(G&&!!G.length){B();var F=A.upload(G);if(!E){E=new AJS.DragAndDropProgressDialog();E.cancelListeners.push(function(J,I){A.cancel(I.workId)});AJS.DragAndDropUtils.enableDropZoneOn(C("#"+E.id)[0]);E.onShowListeners.push(function(){AJS.DragAndDropUtils.enableDropZoneOn(C(".aui-blanket")[0])})}E.show();C.each(F,function(J,I){E.render(I)});AJS.DragAndDropUtils.getDesktopInstance().setDropEffect(H,"copy")}};function D(){var H=document.createElement("div");H.setAttribute("id","filuploadShim");document.body.appendChild(H);var G=new plupload.Uploader({runtimes:"html5",dragdrop:true,drop_element:C("body")[0],browse_button:H,multipart:false,max_file_size:+AJS.params.globalSettingsAttachmentMaxSize}),F=function(){E=new AJS.DragAndDropProgressDialog()};E=null;G.init();AJS.DragAndDrop.defaultDropHandler=null;G.bind("FilesAdded",function(I,L){G.stop();!E&&F();for(var J=0,K=L.length;J<K;J++){E.render({workId:L[J].id,status:L[J].status,file:L[J]})}G.start()});G.bind("BeforeUpload",function(I,K){var J=AJS.DragAndDropUtils.base+AJS.General.getContextPath()+"/plugins/drag-and-drop/upload.action";var L=AJS.params.pageId!=0?{pageId:AJS.params.pageId}:{draftType:AJS.params.draftType},M=K.name.substr(K.name.lastIndexOf(".")+1);L.filename=K.name;L.size=K.size;L.mimeType=plupload.mimeTypes[M.toLowerCase()]||"application/octet-stream";I.settings.url=plupload.buildUrl(J,L);E.cancelListeners.push(function(P,N){var O=I.getFile(N.workId);O&&I.cancelFile(O)});E.show()});G.bind("UploadProgress",function(I,J){E.renderUpdateToBytesUploaded(J.id,J.loaded,J.size);E.disableCloseButton(AJS.DragAndDrop.i18n["upload.in.progress"])});G.bind("FileUploaded",function(I,K,J){E.renderComplete(K.id)});G.bind("FilesRemoved",function(I,K){for(var J=0,L=K.length;
J<L;J++){if(K[J].status==plupload.CANCELLED){E.renderCancelled(K[J].id)}}});G.bind("Error",function(J,K){var I,L;if(K.response){try{I=AJS.$.parseJSON(K.response);L=I.actionErrors[0]}catch(M){L=K.message}}else{L=K.message;if(K.code==plupload.FILE_SIZE_ERROR){L=AJS.format(AJS.DragAndDrop.i18n["validation.file.too.large"],AJS.DragAndDropUtils.niceSize(K.file.size).toString(),AJS.DragAndDropUtils.niceSize(AJS.params.globalSettingsAttachmentMaxSize).toString());!E&&F();E.render({workId:K.file.id,status:K.file.status,file:K.file});E.show()}}E.renderError(K.file.id,L)});G.bind("UploaderIdle",function(){if(!G.total.queued){E.enableCloseButton(AJS.DragAndDrop.i18n["http://10.20.160.198/wiki/s/en/2166/34/1.0.16/_/download/batch/com.atlassian.confluence.plugins.drag-and-drop:drag-and-drop-for-editor/dialog.button.done"]);if(!E.hasErrors()){setTimeout(function(){E.hide();E.clearRenderOutput();window.location.reload()},1000)}}})}function B(){if(!A){A=new AJS.GearsUploadManager(AJS.DragAndDropUtils.getCachingUrl("/download/resources/com.atlassian.confluence.plugins.drag-and-drop:upload-worker/upload-worker.js"));A.addOnErrorHandler(function(F){F.data.actionErrors&&F.data.actionErrors[0]&&E.renderError(F.workId,F.data.actionErrors[0])});A.addOnProgressHandler(function(F){E.renderUpdateToBytesUploaded(F.workId,F.bytesUploaded,F.fileSize)});A.addOnProgressHandler(function(){E.disableCloseButton(AJS.DragAndDrop.i18n["upload.in.progress"])});A.addOnSuccessHandler(function(F){E.renderComplete(F.workId)});A.addOtherMessageHandler(function(F){AJS.log("Received message from worker "+F.sender+": \n"+F.body)});A.addOnIdleHandler(function(){if(E.hasErrors()){E.enableCloseButton(AJS.DragAndDrop.i18n["http://10.20.160.198/wiki/s/en/2166/34/1.0.16/_/download/batch/com.atlassian.confluence.plugins.drag-and-drop:drag-and-drop-for-editor/dialog.button.done"])}else{E.closeButtonText(AJS.DragAndDrop.i18n["dialog.button.reload"]);setTimeout(function(){window.location.reload()},1000)}});A.addOnCancelHandler(function(F){E.renderCancelled(F)})}}AJS.DragAndDropUtils.hasXhrSupport&&D()});
(function(G){var B=function(){this._workIdToBytesUploaded={};this._totalBytes=0},A=/^\w+:\/\/[^\/?#]+/.exec(location.href);B.prototype={update:function(M,L,K){if(!(M in this._workIdToBytesUploaded)){this._totalBytes+=K}this._workIdToBytesUploaded[M]=L},percentComplete:function(){var K=0;G.each(this._workIdToBytesUploaded,function(L,M){K+=M});return Math.round(K*100/this._totalBytes)}};var J=AJS.Editor.ImageDialog.beforeShowListeners,C,D=[],F=new B();J&&J.push(function(){var L=G("#attached-images")[0],N,K;try{N=new XMLHttpRequest();K=!!(N.sendAsBinary||N.upload)&&!(jQuery.browser.mozilla&&jQuery.browser.version.indexOf("1.9.1")>-1)}catch(M){K=false}N=null;if(K){H(L)}else{I(L)}});var I=function(K){AJS.DragAndDropUtils.bindDragEnter(K);AJS.DragAndDropUtils.bindDragOver(K);AJS.DragAndDropUtils.bindDrop(K,function(N){if(!AJS.DragAndDropUtils.isGearsInstalledWithPermissions()){AJS.DragAndDropUtils.preventDefault(N);AJS.DragAndDropUtils.stopPropagation(N);return }AJS.Editor.ImageDialog.clearErrors();var M=AJS.DragAndDropUtils.getFilesFromDropEvent(N);if(M&&!!M.length){E();var L=C.upload(M);G.each(L,function(){if(this.status!=AJS.GearsFileStatus.QUEUED){AJS.Editor.ImageDialog.displayErrors([this.file.name+": "+this.errorMessage])}})}})};var H=function(M){var N=document.createElement("div"),K;N.setAttribute("id","filuploadShim");document.body.appendChild(N);var L=new plupload.Uploader({runtimes:"html5",dragdrop:true,drop_element:M,browse_button:N,multipart:false,stop_propagation:true});L.init();L.bind("FilesAdded",function(O,P){L.start()});L.bind("BeforeUpload",function(O,Q){var P=A+AJS.General.getContextPath()+"/plugins/drag-and-drop/upload.action";var R=AJS.params.pageId!=0?{pageId:AJS.params.pageId}:{draftType:AJS.params.draftType},S=Q.name.substr(Q.name.lastIndexOf(".")+1);R.filename=Q.name;R.size=Q.size;R.mimeType=plupload.mimeTypes[S.toLowerCase()]||"application/octet-stream";O.settings.url=plupload.buildUrl(P,R);D=[];K=new B()});L.bind("UploadProgress",function(O,P){K.update(P.id,P.loaded,P.size);
AJS.Editor.ImageDialog.setUploadInProgress(true,AJS.format(AJS.DragAndDrop.i18n["images.upload.progress"],K.percentComplete().toString()))});L.bind("FileUploaded",function(O,Q,P){Q.name&&D.push(Q.name)});L.bind("Error",function(O,P){if(P.response){try{result=AJS.$.parseJSON(P.response);message=result.actionErrors[0]}catch(Q){message=P.message}}else{message=P.message}AJS.Editor.ImageDialog.displayErrors([message])});L.bind("UploaderIdle",function(){AJS.Editor.ImageDialog.setUploadInProgress(false);!!D.length&&AJS.Editor.ImageDialog.refreshWithLatestImages(D);D=[];K=new B()})};function E(){if(!C){C=new AJS.GearsUploadManager(AJS.DragAndDropUtils.getCachingUrl("/download/resources/com.atlassian.confluence.plugins.drag-and-drop:upload-worker/upload-worker.js"));C.addOnIdleHandler(function(){AJS.Editor.ImageDialog.setUploadInProgress(false);!!D.length&&AJS.Editor.ImageDialog.refreshWithLatestImages(D);D=[];F=new B()});C.addOnProgressHandler(function(K){F.update(K.workId,K.bytesUploaded,K.fileSize);AJS.Editor.ImageDialog.setUploadInProgress(true,AJS.format(AJS.DragAndDrop.i18n["images.upload.progress"],F.percentComplete().toString()))});C.addOnSuccessHandler(function(K){K.filename&&D.push(K.filename)});C.addOnErrorHandler(function(K){G.each(K.data.actionErrors||[],function(){AJS.Editor.ImageDialog.displayErrors([this])})})}}})(AJS.$);
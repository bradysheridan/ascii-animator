$(function() {
  // handler: toggle controls
  $(".toggle-controls").on('click', function(e) {
    e.preventDefault();
    $(".controls").toggleClass("hidden");
  });

  // handler: change sketch size
  $("input[name='size']").on('change', function(e) {
    onChangeSketchSize(e.target.value)
  });

  // handler: change edge detection threshold
  $("input[name='edge-detection-threshold']").on('change', function(e) {
    onChangeEdgeDetectionThreshold(e.target.value)
  });

  // handler: change presketch image
  $("input[name='presketch-image']").on('change', function(e) {
    if (this.files && this.files.length === 1) {
      loadPresketchImage(this, reconfigure);
    }

    if (this.files && this.files.length > 1) {
      loadPresketchImages(this, bindSketchEventListeners);
    }
  });

  // handler: change sketch background image
  $("input[name='sketch-background-image']").on('change', function(e) {
    loadSketchBackgroundImage(this);
  });

  // handler: submit redraw
  $("input[name='submit-redraw']").on('submit', function(e) {
    e.preventDefault();
    reconfigure();
  });

  // handler: download sketch frame
  $("input[name='download-sketch-frame']").on('click', function() {
    var text1 = "export default [",
        text2 = "",
        text3 = "];",
        filename = "frames.js";

    $("#plain-text-sketch pre").each(function(i) {
      text2 += `\`${$(this).text()}\`,`;
    })
    
    downloadSketchFrame(filename, text1 + text2 + text3);
  });

  // handler: replace selected text
  $('body').keyup(function(e) {
    if (e.keyCode == 88) {
      console.log("x");
      replaceSelectedText("test");
    }
 });


  function bindSketchEventListeners() {
    $("pre[contenteditable]").on("input", function(e) {
      let frameIndex = $(this).parent().index(),
          caretPos = $(this).caret(),
          char = e.originalEvent.isTrusted ? e.originalEvent.data : null;

      if (!char) return;

      $("pre").text(function(i) {
        if (i <= frameIndex) return;
        let text = $(this).text();
        let newText = text.substring(0, caretPos - 1) + char + text.substring(caretPos);
        return newText;
      });
    });
  }

  function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
  }

  function onChangeSketchSize(newVal) {
    $("label[for='size']").html(`Sketch size: ${newVal}px`);
    SKETCH_SIZE = newVal;
    reconfigure();
  }

  function onChangeEdgeDetectionThreshold(newVal) {
    $("label[for='edge-detection-threshold']").html(`Edge detection threshold: ${newVal}`);
    EDGE_DETECTION_THRESHOLD = newVal;
    reconfigure();
  }

  function loadPresketchImage(input, callback) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#presketch-image').attr('src', e.target.result);
      SRC_IMG = e.target.result;
      callback();
    }

    reader.readAsDataURL(input.files[0]);
  }

  function loadPresketchImages(input, callback) {
    function loadImage(i) {
      var reader = new FileReader();

      // configure frame elements
      let frameNumber = i + 1
      if (frameNumber === 1) {
        $("#plain-text-sketch").attr("data-frame-number", frameNumber);
      } else {
        let elSketchWrap = $("#plain-text-sketch").clone();
        elSketchWrap.attr("data-frame-number", frameNumber);
        $("#plain-text-sketch").parent().append(elSketchWrap)

        let elFramePreview = $("#frame-preview-1").clone();
        elFramePreview.attr("id", `frame-preview-${frameNumber}`);
        elFramePreview.attr("data-frame-number", frameNumber);
        elFramePreview.find(".frame-number").html(frameNumber);
        $(".frame-preview-list").append(elFramePreview);
      }

      // load image
      reader.onload = function(e) {
        $('#presketch-image').attr('src', e.target.result);

        SRC_IMG = e.target.result;
        SKETCH_TARGET_EL_QUERY_SELECTOR = `#plain-text-sketch[data-frame-number='${frameNumber}'] pre`;

        if (i === input.files.length - 1) {
          reconfigure(callback);
        } else {
          reconfigure(() => loadImage(i + 1));
        }
      }

      reader.readAsDataURL(input.files[i]);
    }

    loadImage(0);
  }

  function loadSketchBackgroundImage(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#sketch-background-image').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  function downloadSketchFrame(filename, text) {
    // create temporary download element
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);

    // download
    element.click();

    // remove temporary download element
    document.body.removeChild(element);
  }

  // var files = $('#files')[0].files; //where files would be the id of your multi file input
  // //or use document.getElementById('files').files;
  
  // for (var i = 0, f; f = files[i]; i++) {
  
  //     var reader = new FileReader();
  
  //     reader.onload = function (e) {
  //         $('#pprev_'+fileCount)
  //         .attr('src', e.target.result)
  //         .css("display","block");
  //     };
  
  //     reader.readAsDataURL(f);
  
  // }
});

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2,
  File,
  Presentation,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
}

interface FileUploadProps {
  onFilesProcessed?: (files: UploadedFile[]) => void;
}

export function FileUpload({ onFilesProcessed }: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('presentation') || type.includes('ppt')) return Presentation;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...uploadedFiles]);

    // Simulate upload progress
    uploadedFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== fileId) return f;
          
          if (f.progress >= 100) {
            clearInterval(interval);
            return { ...f, status: 'processing' as const };
          }
          
          return { ...f, progress: Math.min(f.progress + 10, 100) };
        })
      );
    }, 200);

    // Simulate processing completion
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, status: 'complete' as const } : f
        )
      );
    }, 3500);
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <Card variant="glass">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Upload Course Materials</h3>
            <p className="text-sm text-muted-foreground">
              Drop your syllabus, slides, or notes
            </p>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
            isDragging 
              ? "border-accent bg-accent/5" 
              : "border-border hover:border-accent/50 hover:bg-muted/50"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <Upload className={cn(
            "h-10 w-10 mx-auto mb-4 transition-colors",
            isDragging ? "text-accent" : "text-muted-foreground"
          )} />
          
          <p className="font-medium mb-1">
            {isDragging ? "Drop files here" : "Click or drag files to upload"}
          </p>
          <p className="text-sm text-muted-foreground">
            PDF, PPT, DOC, TXT up to 50MB
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-3">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      {file.status === 'complete' && (
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      )}
                      {file.status === 'processing' && (
                        <Loader2 className="h-4 w-4 text-accent animate-spin shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      {file.status === 'uploading' && (
                        <>
                          <Progress value={file.progress} className="h-1 w-20" />
                          <span className="text-xs text-muted-foreground">
                            {file.progress}%
                          </span>
                        </>
                      )}
                      {file.status === 'processing' && (
                        <Badge variant="secondary" className="text-xs">
                          Processing...
                        </Badge>
                      )}
                      {file.status === 'complete' && (
                        <Badge variant="success" className="text-xs">
                          Ready
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {files.some(f => f.status === 'complete') && (
          <Button variant="hero" className="w-full mt-4">
            Generate Study Plan
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
